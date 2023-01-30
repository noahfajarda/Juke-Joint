const router = require("express").Router();
const checkIfLoggedInReroute = require("../utils/checkIfLoggedInReroute");

router.get("/login", async (req, res) => {
    res.render("login");
});

router.get("/signup", async (req, res) => {
    res.render("login");
});

// route to test autocomplete
router.get("/search", checkIfLoggedInReroute, (req, res) => {
    // .redirect == change the url back to 'login' AND reroute the page
    // .render == just change the page
    res.render("auto", { userId: req.session.userId });
});

router.get("/:anything", checkIfLoggedInReroute, async (req, res) => {
    res.redirect("login");
});

module.exports = router;
