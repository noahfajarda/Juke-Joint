// Express
const express = require("express");
const app = express();
const PORT = 3001;
require("dotenv").config();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handlebars stuff & middleware
const exphbs = require("express-handlebars-hotreload");
// BUG: why is this not working
// exphbs.hotreload();
const hbs = exphbs.create({ hotreload: true });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// routes linking to 'controllers'
const router = require("./controllers");

const sequelize = require("./config/connection");
// BUG: why is this not working, why can't I do object destructure
// import sequel models
const User = require("./models/User");
const Comment = require("./models/Comment");
const Post = require("./models/Post");
const SearchedSong = require("./models/SearchedSong");
const session = require("express-session");

//connect-session-sequelize sets up a session store table in the database, to replace in-memory storage
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//session configuration object, refer to express-session documentation to modify configs
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000, //this is 1 hour, adjust if you need to
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//apply session middleware
app.use(session(sess));

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
    const trackRes = await search_for_track(accessToken, "Me and Your Mama");
    const trackData = await trackRes.json();
    // extract necessary track data
    // const trackArt = trackData.tracks.items[0].album.images[3].url;
    const trackArt = trackData.tracks.items[0].album.images[2].url;
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

// change to { force: false } once we figure out our database strucutre
// { force: true } used for development and testing database structure
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
});
