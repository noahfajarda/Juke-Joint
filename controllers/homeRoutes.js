const router = require("express").Router();

// middleware check for log in
function checkIfLoggedInReroute(req, res, next) {
    //if they not logged in, go to login page
    if (req.session.userId) {
        return res.redirect("/");
    }
    next();
    // res.render("homepage", { ...req.session });
}

router.get("/login", checkIfLoggedInReroute, async (req, res) => {
    res.render("login");
});

router.get("/signup", async (req, res) => {
    res.render("signup");
});

// route to test autocomplete
router.get("/search", checkIfLoggedInReroute, (req, res) => {
    // .redirect == change the url back to 'login' AND reroute the page
    // .render == just change the page
    res.render("auto");
});

router.get("/:anything", checkIfLoggedInReroute, async (req, res) => {
    res.redirect("login");
});

module.exports = router;
