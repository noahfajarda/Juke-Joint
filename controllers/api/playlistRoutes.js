const router = require("express").Router();
const Playlist = require("../../models/Playlist");

router.post("/", async (req, res) => {
    try {
        Playlist.create({
            trackId: req.body.trackId,
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
            trackArt: req.body.trackArt,
        })
            .then((playlistData) => {
                res.json(playlistData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/playlist", async (req, res) => {
    console.log("GETTING PLAYLIST TEST");
    try {
        console.log("TEST FOR TRY BLOVK");
        Playlist.findAll({
            // where: {
            //     trackName: {
            //         [Op.not]: null,
            //     }
            // },
        })
            .then((playlistData) => {
                const filteredData = playlistData.map((playlist) =>
                    playlist.get({ plain: true })
                );

                console.log("TESTINGGGGG");
                console.log(filteredData);
                res.render("playlist", { filteredData });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
