// Express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handlebars & middleware
const exphbs = require("express-handlebars-hotreload");
// hotreload
exphbs.hotreload();
const hbs = exphbs.create({ hotreload: process.env.NODE_ENV != "production" });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// routes linking to 'controllers'
const router = require("./controllers");

const sequelize = require("./config/connection");
const session = require("express-session");

//connect-session-sequelize sets up a session store table in the database, to replace in-memory storage
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//session configuration object, refer to express-session documentation to modify configs
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000, // user session reload time is 1 hour, adjust if you need to
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//apply session middleware
app.use(session(sess));
app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening at 🚀🚀🚀 http://localhost:${PORT} 🚀🚀🚀`)
  );
});


// Comment test