// This file is SOLELY to get the access token

// import terminal colors
const { colors } = require("./fetch-API-data-&-colors");
// use req.session somehow
const session = require("express-session");
require("dotenv").config();
// set spotify API credentials
const client_id = process.env.CLIENT_ID; // Spotify Client_ID
const client_secret = process.env.CLIENT_SECRET; // Spotify Client_Secret
// musixmatch credentials
const musixmatch_api_key = process.env.MUSIXMATCH_API_KEY; // Spotify Musixmatch API key
// "retrieve ACCESS TOKEN" function
async function getAccessToken() {
<<<<<<< HEAD
  const testing = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      // taken from spotify api docs
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ` + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  });
  const filteredResults = await testing.json();
  console.log(
    `\n\n\n\n\n ${colors.yellow}Line 24 retrieve-authorizationToken.js:${colors.white}`
  );
  console.log(filteredResults); // access_token & expires_in
  const accessToken = filteredResults.access_token;
  console.log(`${colors.magenta}Access Token ${accessToken}${colors.white}`); // recolor access token
  return accessToken;
=======
    const testing = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            // taken from spotify api docs
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ` + btoa(client_id + ":" + client_secret),
        },
        body: "grant_type=client_credentials",
    });
    const filteredResults = await testing.json();

    // RETRIEVING THE ACCESS TOKEN
    console.log(filteredResults); // access_token & expires_in
    const accessToken = filteredResults.access_token;
    console.log(`${colors.magenta}Access Token ${accessToken}${colors.white}\n`); // recolor access token
    return accessToken;
>>>>>>> 1cb236c33043b466a4bcdcd183fb5205b27037bb
}

function accessTokenExpired() {
  // colored error message
  console.log("\x1b[31m" + "\nThe access token expired.");
  console.log("\x1b[31m" + "Copy the access token again printed from console.");
  // console.log(err);
}

module.exports = { getAccessToken, accessTokenExpired };
