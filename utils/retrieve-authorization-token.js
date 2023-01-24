// This file is SOLELY to get the access token

// import terminal colors
const { colors } = require("./fetch-API-data-&-colors");
require("dotenv").config();

// set spotify API credentials
const client_id = process.env.CLIENT_ID; // Spotify Client_ID
const client_secret = process.env.CLIENT_SECRET; // Spotify Client_Secret

// "retrieve ACCESS TOKEN" function
async function getAccessToken() {
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
    const accessToken = filteredResults.access_token;
    console.log(`${colors.magenta}Access Token ${accessToken}${colors.white}\n`); // recolor access token
    return accessToken;
}

function accessTokenExpired() {
    // colored error message
    console.log("\x1b[31m" + "\nThe access token expired.");
    console.log(
        "\x1b[31m" + "Copy the access token again printed from console."
    );
}

module.exports = { getAccessToken, accessTokenExpired };
