// middleware check for log in
function checkIfLoggedInReroute(req, res, next) {
    //if they not logged in, go to login page
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

module.exports = checkIfLoggedInReroute;
