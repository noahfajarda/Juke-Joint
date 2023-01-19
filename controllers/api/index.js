const router = require("express").Router();
const { Artists } = require("../../models");
const { Op } = require("sequelize");

const userRoutes = require("./userRoutes");

const playlistRoutes = require("./playlistRoutes");
const likesRoutes = require("./likesRoutes");

router.use("/user", userRoutes);
router.use("/playlist", playlistRoutes);
router.use("/likes", likesRoutes);

router.post("/search", async (req, res) => {
    console.log(req.body.keyword);
    const matches = await Artists.findAll({
        where: {
            name: {
                [Op.like]: `%${req.body.keyword}%`,
            },
        },
        limit: 100,
    });
    res.json(matches);
});

module.exports = router;
