const router = require("express").Router();
const Likes = require("../../models/Likes");

router.post('/', async (req,res) => {
    try {
        Likes.create({
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
            trackId: req.session.trackId,
            title: req.body.title,
            trackArt: "test"
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
})


router.get('/likes', async (req,res) => {
    console.log("GETTING PLAYLIST TEST")
    try {
        console.log('TEST FOR TRY BLOVK')
        Likes.findAll({
            // where: {
            //     trackName: {
            //         [Op.not]: null,
            //     }
            // },
        })
            .then((likesData) => {
                const filteredLikesData = likesData.map((likes) => likes.get({ plain: true }));

                console.log('TESTINGGGGG')
                console.log(filteredLikesData)
                res.render("likes", { filteredLikesData } );
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;
