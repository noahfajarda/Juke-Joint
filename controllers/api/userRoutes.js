const router = require("express").Router();
const { User } = require("../../models");
//User routes are completed for you so you don't have to deal with setting up authentication
//Study this code to see how it works, and how it is connected to the frontend

// POST /api/users is a registration route for creating a new user
router.post("/", async (req, res) => {
  try {
    console.log(req.body.firstname);
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.firstname = newUser.firstname;
      req.session.lastname = newUser.lastname;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users/login is a login route for an existing user
router.post("/login", async (req, res) => {
  try {
    // finds a user
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // error if no user found
    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    // check password against the db password
    const validPassword = user.checkPassword(req.body.password);

    // error if invalid password
    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    // save that the user login state & user credentials in 'session'
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.firstname = user.firstname;
      req.session.lastname = user.lastname;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

// POST /api/users/logout is a logout route for an existing user,
//it also destroys the session so the user is no longer logged in'
//to log out, hit a post req to /api/user/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
