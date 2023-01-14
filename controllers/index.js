//index.js inside /api combines all api routes and exports one router middleware module
const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const spotifyRoutes = require("./spotifyRoutes");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
//userRoutes will have /user prepended to all routes
router.use(homeRoutes);
//postRoutes will have /post prepended to all routes
router.use(spotifyRoutes);

module.exports = router;
