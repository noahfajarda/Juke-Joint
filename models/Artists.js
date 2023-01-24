const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Artist extends Model {}
Artist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "Artist",
    }
);

module.exports = Artist;
