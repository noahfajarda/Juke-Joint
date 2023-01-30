const router = require("express").Router();
const Likes = require("../../models/Likes");

router.post("/checkLike", async (req, res) => {
    try {
        let likedSong;
        Likes.findAll({ where: { trackId: req.body.trackId, userId: req.body.userId } })
            .then((data) => {
                if (data.length != 0) {
                    res.status(200).json(data)
                } else {
                    res.status(500).json(data)
                }
            })
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

router.post("/add", async (req, res) => {
    try {
        Likes.create({
            trackId: req.body.trackId,
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
            trackArt: req.body.trackArt,
            userId: req.body.userId,
        })
            .then((likesData) => {
                res.json(likesData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/remove", async (req, res) => {
    try {
        Likes.destroy({ where: { trackId: req.body.trackId } })
            .then((likesData) => {
                res.json(likesData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/likes", async (req, res) => {
    try {
        Likes.findAll({})
            .then((likesData) => {
                const filteredLikesData = likesData.map((likes) =>
                    likes.get({ plain: true })
                );
                filteredLikesData.reverse();
                res.render("likes", { filteredLikesData, userId: req.session.userId });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/", async (req, res) => {
    try {
        console.log("The route was hit")
        Likes.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then((likesData) => {
                const filteredLikesData = likesData.map((likes) =>
                    likes.get({ plain: true })
                );
                res.render("likes", { filteredLikesData });
            })
        res.status(200).json(likesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
