const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Likes extends Model {}
Likes.init(
    {
        SearchedSongId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trackName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        trackArtist: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        trackArt: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "Likes",
    }
);

module.exports = Likes;
