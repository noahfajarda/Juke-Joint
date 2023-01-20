const router = require("express").Router();
// prettier-ignore
const {getAccessToken, accessTokenExpired} = require("../utils/retrieve-authorization-token.js");
// prettier-ignore
const {search_for_track, search_for_album, search_for_artist, retrieve_lyrics, colors} = require("../utils/fetch-API-data-&-colors");
// prettier-ignore
const {getSong, getLyrics} = require("../utils/retrieve-lyrics")

// Import models
const { User, Comment, Post, SearchedSong, Artists } = require("../models");

// testing keys: edit the titles for 'artist', 'album', & 'track'
const testData = [
    { artist: "anderson Paak", endpoint: "http://localhost:3001/artist" },
    { album: "SOS", endpoint: "http://localhost:3001/album" },
    { track: "i kendrick lamar", endpoint: "http://localhost:3001/track" },
];

const checkIfLoggedInReroute = require("../utils/checkIfLoggedInReroute");

// main route
router.get("/", async (req, res) => {
    //if they not logged in, go to login page
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    res.render("homepage", { ...req.session });
});

async function fetch_artist_data(accessToken, artist) {
    // ARTIST FETCH
    const artistRes = await search_for_artist(accessToken, artist);
    const artistData = await artistRes.json();
    // extract necessary artist data
    const artistName = artistData.artists.items[0].name;
    const artistId = artistData.artists.items[0].id;
    // log extracted data
    // console.log(`\nArtist Name: ${artistName}\nArtist ID: ${artistId}`);

    // store data in res.json() object
    return {
        artistName,
        artistId,
    };
}
async function fetch_album_data(accessToken, album) {
    const albumRes = await search_for_album(accessToken, album);
    const albumData = await albumRes.json();
    // extract necessary album data
    const albumName = albumData.albums.items[0].name;
    const albumArtist = albumData.albums.items[0].artists[0].name;
    const albumId = albumData.albums.items[0].id;
    // log extracted data
    // console.log(
    //     `\nAlbum Name: ${albumName} {by: ${albumArtist}}\nAlbum ID: ${albumId}`
    // );

    // store data in res.json() object
    return {
        albumName,
        albumArtist,
        albumId,
    };
}
async function fetch_track_data(accessToken, track) {
    // TRACK FETCH
    const trackRes = await search_for_track(accessToken, track);
    const trackData = await trackRes.json();
    // extract necessary track data
    const trackArt = trackData.tracks.items[0].album.images[2].url;
    const trackName = trackData.tracks.items[0].name;
    const trackArtist = trackData.tracks.items[0].artists[0].name;
    const trackId = trackData.tracks.items[0].id;

    return {
        trackName,
        trackArtist,
        trackId,
        trackArt,
    };
}

// constant artist route
router.get("/artist", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    try {
        const constantArtist = await fetch_artist_data(
            accessToken,
            testData[0].artist
        );
        constantArtist.title = "Artist";
        res.render("artist", constantArtist);
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.status(500).json(err);
    }
});

// variable artist route
router.get("/artist/:artist", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        // fetch artist from req.params & res.json()
        const specificArtist = await fetch_artist_data(
            accessToken,
            req.params.artist
        );
        specificArtist.title = "Artist";
        // console.log(specificArtist);

        // retrieve comments for associated song
        const comments = await Comment.findAll({
            where: {
                searchedItem: req.params.artist,
                type: "Artist",
            },
            include: [
                {
                    model: User,
                },
            ],
            raw: true,
        });
        specificArtist.comments = comments.reverse();
        specificArtist.userId = req.session.userId;
        console.log(specificArtist);

        res.render("artist", specificArtist);
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.status(500).json(err);
    }
});

// constant album route
router.get("/album", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const constantAlbum = await fetch_album_data(
            accessToken,
            testData[1].album
        );
        constantAlbum.title = "Album";
        res.render("album", constantAlbum);
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.status(500).json(err);
    }
});

// variable album route
router.get("/album/:album", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const specificAlbum = await fetch_album_data(
            accessToken,
            req.params.album
        );
        specificAlbum.title = "Album";

        // retrieve comments for associated song
        const comments = await Comment.findAll({
            where: {
                searchedItem: req.params.album,
                type: "Album",
            },
            include: [
                {
                    model: User,
                },
            ],
            raw: true,
        });
        specificAlbum.comments = comments.reverse();

        // console.log(req.session.loggedIn);
        // console.log(req.session.userId);
        specificAlbum.userId = req.session.userId;
        // console.log(specificAlbum);

        res.render("album", specificAlbum);
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.status(500).json(err);
    }
});

// constant track route
router.get("/track", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const constantTrack = await fetch_track_data(
            accessToken,
            testData[2].track
        );
        constantTrack.title = "Track";

        res.render("track", constantTrack);
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.status(500).json(err);
    }
});

// variable track route
router.get("/track/:track", checkIfLoggedInReroute, async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        // TODO: find a way to integrate "promise.all()"
        const specificTrack = await fetch_track_data(
            accessToken,
            req.params.track
        );
        specificTrack.title = "Track";

        // array of duplicates, should be duplicated to feed suggestions
        const test = await SearchedSong.findAll({ raw: true });

        // retrieve comments for associated song
        const comments = await Comment.findAll({
            where: {
                searchedItem: req.params.track,
                type: "Track",
            },
            include: [
                {
                    model: User,
                },
            ],
            raw: true,
        });
        specificTrack.comments = comments.reverse();

        SearchedSong.create(specificTrack).then(
            console.log("Added to the 'Searched Song' table in the DB!")
        );
        // console.log(req.params.track);
        // console.log(comments);

        // console.log(req.session.loggedIn);
        // console.log(req.session.userId);
        specificTrack.userId = req.session.userId;

        // LYRICS!!
        const song_get = await getSong(
            specificTrack.trackName,
            specificTrack.trackArtist,
            "pwUpWRQwegLyPxG9hbfzkmhpGCYexXSF4LxV_8r2dxGSss6ThUkHNNdOMV4E0ZpI"
        );
        if (song_get.length > 0) {
            const songURL = song_get[0].url;
            // lyrics is a string
            const lyrics = await getLyrics(songURL);
            specificTrack.lyrics = lyrics.split("\n");
        }

        // console.log(specificTrack);

        res.render("track", specificTrack);
    } catch (err) {
        accessTokenExpired();
        console.log(err);

        //instead of sending raw error, show can'tt find song/artists page
        res.redirect("/");
    }
});

module.exports = router;
