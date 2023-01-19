// apiKey: "pwUpWRQwegLyPxG9hbfzkmhpGCYexXSF4LxV_8r2dxGSss6ThUkHNNdOMV4E0ZpI",
//     // retrieve apiKey from here: https://genius.com/api-clients
//     optimizeQuery: true,
const song = "homecoming";
const artist = "kanye";
const token = process.env.GENIUS_LYRICS_API_KEY;

// searchSong
async function getSongData(song, artist) {
    // search song
    const data = await fetch(
        `https://api.genius.com/search?q=${song}${artist}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    let songData = await data.json();
    // console.log(songData);
    // console.log(song);
    // console.log(artist);
    songData = songData.response.hits.map((val) => {
        // destructure to retrieve specific variables
        const {
            full_title,
            title,
            title_with_featured,
            song_art_image_url,
            id,
            url,
        } = val.result;
        return {
            id,
            full_title,
            title,
            title_with_featured,
            albumArt: song_art_image_url,
            url,
        };
    });
    return songData;
}

// get lyrics by web scraping genius
async function getLyrics(url) {
    // npm i axios to retrieve data from urls
    // npm i cheerio to fetch the data
    const axios = require("axios");
    const cheerio = require("cheerio");

    // get from here: https://genius.com/J-cole-wet-dreamz-lyrics
    console.log(url);

    // webscraping
    // tutorial found on here: https://www.youtube.com/watch?v=4ty0VzIagW4

    // call to a url and wait for it to be done
    let { data } = await axios.get(url);
    // fetch the data from the site
    const $ = cheerio.load(data);
    // decide where to go and get the data from the site's structure
    // the element with class='lyrics'
    // just retrieve text & trim off any extra space
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
        lyrics = "";
        $('div[class^="Lyrics__Container"]').each((i, elem) => {
            // go through
            if ($(elem).text().length !== 0) {
                // retrieve some of the lyrics
                // .replace == replace every instance of "<br>" with "\n"
                // .replace == replace every tag & in-between until next text with nothing (start with end of tag, end with the last char leading toward next text)
                let snippet = $(elem)
                    .html()
                    .replace(/<br>/g, "\n")
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");

                // add the snippet to lyrics
                lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
            }
        });
    }
    return lyrics.trim();
}

// getSong
async function getSong(song, artist, token) {
    const results = await getSongData(song, artist, token);
    return results;
}

async function main() {
    try {
        // const songData = await getSongData(song, artist, token);
        // console.log("SONG DATA: ");
        // console.log(songData);
        // const song_get = await getSong(song, artist, token);
        // console.log("SONG GET: ");
        // console.log(song_get);
        // const songURL = song_get[0].url;
        // const lyrics = await getLyrics(songURL);
        // console.log(lyrics);
    } catch (err) {
        console.log(err);
    }
}

main();

module.exports = {
    getSong,
    getLyrics,
};
