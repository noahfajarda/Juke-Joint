const Sequelize = require("sequelize");
require("dotenv").config();
console.log(process.env.DB_NAME);

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // create connection to our db, JAWSDB_URL env variable is provided by heroku in production environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: process.env.DB_PORT || 3306,
    }
  );
}

module.exports = sequelize;
