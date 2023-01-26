// retrieve apiKey from here: https://genius.com/api-clients
const token = process.env.GENIUS_LYRICS_API_KEY;
// npm i axios to retrieve data from urls
// npm i cheerio to fetch the data
const axios = require("axios");
const cheerio = require("cheerio");

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
    songData = songData.response.hits.map((val) => {
        // destructure to retrieve specific variables we want
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

// get lyrics by web scraping song lyrics URL from 'genius'
// i.e.: https://genius.com/J-cole-wet-dreamz-lyrics
async function getLyrics(url) {
    // webscraping
    // tutorial found on here: https://www.youtube.com/watch?v=4ty0VzIagW4

    // call to a url and wait for it to be done
    let { data } = await axios.get(url);
    // fetch the data from the site
    const $ = cheerio.load(data);
    // decide where to go and get the data from the site's structure
    // just retrieve text from element: class='lyrics', & trim off any extra space
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
        lyrics = "";
        // go through each line of the lyrics
        $('div[class^="Lyrics__Container"]').each((i, elem) => {
            if ($(elem).text().length !== 0) {
                // retrieve some of the lyrics
                let snippet = $(elem)
                    .html()
                    // .replace == replace every instance of "<br>" with "\n"
                    .replace(/<br>/g, "\n")
                    // .replace == replace every tag & in-between until next text with nothing (start with end of tag, 
                    // end with the last char leading toward next text)
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");

                // add the snippet to lyrics
                lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
            }
        });
    }
    return lyrics.trim();
}

// getSong data
async function getSong(song, artist, token) {
    const results = await getSongData(song, artist, token);
    return results;
}

module.exports = {
    getSong,
    getLyrics,
};
