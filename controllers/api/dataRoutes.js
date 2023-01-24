const router = require("express").Router();
// prettier-ignore
const {getAccessToken, accessTokenExpired} = require("../../utils/retrieve-authorization-token.js");
// prettier-ignore
const {search_for_track, search_for_album, search_for_artist, retrieve_lyrics, colors} = require("../../utils/fetch-API-data-&-colors");

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

// route to retrieve data from initial user search
// PURPOSE: have the url the same every time
router.post("/:userInput", async (req, res) => {
    const accessToken = await getAccessToken();
    try {
        if (req.body.type == "track") {
            // get only 1 part
            const specificTrack = await fetch_track_data(
                accessToken,
                req.params.userInput
            );
            specificTrack.title = "Track"
            res.send(specificTrack)
        } else if (req.body.type == "album") {
            const specificAlbum = await fetch_album_data(
                accessToken,
                req.params.userInput
            );
            specificAlbum.title = "Album";
            res.send(specificAlbum);
        } else if (req.body.type == "artist") {
            const specificArtist = await fetch_artist_data(
                accessToken,
                req.params.userInput
            );
            specificArtist.title = "Artist";
            res.send(specificArtist);
        }
    } catch (err) {
        accessTokenExpired();
        console.log(err);
        res.redirect("/");
    }
});
module.exports = router;







// async function test() {
//     const type = "Album";
//     const specifics = {
//         "Album": async () => {
//             const specificAlbum = await fetch_album_data(
//                 accessToken,
//                 "Ye"
//             );
//             specificAlbum.title = "Album";
//             return specificAlbum;
//         }
//     }

//     const accessToken = await getAccessToken();
//     console.log(await specifics[type]())
// }
// test();
// TEST