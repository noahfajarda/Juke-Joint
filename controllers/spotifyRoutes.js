const router = require("express").Router();
// prettier-ignore
const {getAccessToken, accessTokenExpired} = require("../utils/retrieve-authorization-token.js");
// prettier-ignore
const {search_for_track, search_for_album, search_for_artist, retrieve_lyrics, colors} = require("../utils/fetch-API-data-&-colors");

// testing keys: edit the titles for 'artist', 'album', & 'track'
const testData = [
    { artist: "anderson Paak", endpoint: "http://localhost:3001/artist" },
    { album: "SOS", endpoint: "http://localhost:3001/album" },
    { track: "i kendrick lamar", endpoint: "http://localhost:3001/track" },
];

// main route
router.get("/", async (req, res) => {
    // res.render("all");
    res.json("test");
});

async function fetch_artist_data(accessToken, artist) {
    // ARTIST FETCH
    const artistRes = await search_for_artist(accessToken, artist);
    const artistData = await artistRes.json();
    // extract necessary artist data
    const artistName = artistData.artists.items[0].name;
    const artistId = artistData.artists.items[0].id;
    // log extracted data
    console.log(`\nArtist Name: ${artistName}\nArtist ID: ${artistId}`);

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
    console.log(
        `\nAlbum Name: ${albumName} {by: ${albumArtist}}\nAlbum ID: ${albumId}`
    );

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
    const trackName = trackData.tracks.items[0].name;
    const trackArtist = trackData.tracks.items[0].artists[0].name;
    const trackId = trackData.tracks.items[0].id;
    // log extracted data
    console.log(
        `\nTrack Name: ${trackName} {by: ${trackArtist}}\nTrack ID
        : ${trackId}`
    );

    return {
        trackName,
        trackArtist,
        trackId,
    };
}

// constant artist route
router.get("/artist", async (req, res) => {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    try {
        const constantArtist = await fetch_artist_data(
            accessToken,
            testData[0].artist
        );
        res.json(constantArtist);
    } catch {
        accessTokenExpired();
    }
});

// variable artist route
router.get("/artist/:artist", async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        // fetch artist from req.params & res.json()
        const specificArtist = await fetch_artist_data(
            accessToken,
            req.params.artist
        );
        res.json(specificArtist);
    } catch {
        accessTokenExpired();
    }
});

// constant album route
router.get("/album", async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const constantArtist = await fetch_album_data(
            accessToken,
            testData[1].album
        );
        constantArtist.title = "Album";
        res.json(constantArtist);
    } catch {
        accessTokenExpired();
    }
});

// variable album route
router.get("/album/:album", async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        const constantArtist = await fetch_album_data(
            accessToken,
            req.params.album
        );
        constantArtist.title = "Album";
        res.json(constantArtist);
    } catch {
        accessTokenExpired();
    }
});

module.exports = router;

// DOESN'T WORK RIGHT NOW
