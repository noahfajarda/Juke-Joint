// Express
const express = require("express");
const app = express();
const PORT = 3001;
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handlebars stuff & middleware
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// routes linking to 'controllers'
const router = require("./controllers/spotifyRoutes.js");
app.use(router);

// acccess token
// prettier-ignore
const {getAccessToken, accessTokenExpired} = require("./utils/retrieve-authorization-token.js");
// fetch API data
// prettier-ignore
const {search_for_track, search_for_album, search_for_artist, retrieve_lyrics, colors} = require("./utils/fetch-API-data-&-colors");

async function main() {
    // accessToken = ACTUAL access token
    const accessToken = await getAccessToken();

    // testing each API fetch
    try {
        // ARTIST FETCH
        const artistRes = await search_for_artist(accessToken, "anderson Paak");
        const artistData = await artistRes.json();
        // extract necessary artist data
        const artistName = artistData.artists.items[0].name;
        const artistId = artistData.artists.items[0].id;
        // log extracted data
        console.log(`\nArtist Name: ${artistName}\nArtist ID: ${artistId}`);

        // ALBUM FETCH
        const albumRes = await search_for_album(accessToken, "Camp");
        const albumData = await albumRes.json();
        // extract necessary album data
        const albumName = albumData.albums.items[0].name;
        const albumArtist = albumData.albums.items[0].artists[0].name;
        const albumId = albumData.albums.items[0].id;
        // log extracted data
        console.log(
            `\nAlbum Name: ${albumName} {by: ${albumArtist}}\nAlbum ID: ${albumId}`
        );

        // TRACK FETCH
        const trackRes = await search_for_track(
            accessToken,
            "Me and Your Mama"
        );
        const trackData = await trackRes.json();
        // extract necessary track data
        const trackName = trackData.tracks.items[0].name;
        const trackArtist = trackData.tracks.items[0].artists[0].name;
        const trackId = trackData.tracks.items[0].id;
        // log extracted data
        console.log(`\nTrack Name: ${trackName} {by: ${trackArtist}}`);
        console.log(`Track ID: ${trackId}`);
    } catch (err) {
        accessTokenExpired();
    }
}

main();

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
