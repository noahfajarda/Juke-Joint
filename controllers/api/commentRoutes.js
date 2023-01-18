const router = require("express").Router();
const { Comment } = require("../../models/");

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", async (req, res) => {
    try {
        Comment.create({
            searchedItem: req.body.searchedItem,
            body: req.body.body,
            userId: req.session.userId,
            type: req.body.type,
        })
            .then((commentData) => {
                res.json(commentData);
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
