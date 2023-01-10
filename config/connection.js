const Sequelize = require("sequelize");
require("dotenv").config();

// create connection to our db, JAWSDB_URL env variable is provided by heroku in production environment
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        port: 8889,
    }
);

module.exports = sequelize;
