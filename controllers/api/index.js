const router = require("express").Router();
const { Artists } = require("../../models");
const { Op } = require("sequelize");

const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/comment", commentRoutes);

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
