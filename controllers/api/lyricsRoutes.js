const router = require("express").Router();
const { getSong, getLyrics } = require("../../utils/retrieve-lyrics");

router.post("/", async (req, res) => {
    try {
        // account for (feat. )
        if (req.body.trackName.includes("(")) {
            req.body.trackName = req.body.trackName.slice(
                0,
                req.body.trackName.indexOf("(")
            );
        }
        const song_get = await getSong(
            req.body.trackName,
            req.body.trackArtist,
            "pwUpWRQwegLyPxG9hbfzkmhpGCYexXSF4LxV_8r2dxGSss6ThUkHNNdOMV4E0ZpI"
        );
        // console.log to check if the first song in the list of songs is the one you want
        console.log(song_get);
        if (song_get.length > 0) {
            const songURL = song_get[0].url;
            console.log("SUCCESS");
            // lyrics is a string
            let lyrics = await getLyrics(songURL);
            lyrics = lyrics.split("\n");
            res.json(lyrics);
        } else {
            res.json(["No lyrics found"]);
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
