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
        trackId: {
            type: DataTypes.STRING,
        },
        trackName: {
            type: DataTypes.STRING,
        },
        trackArtist: {
            type: DataTypes.STRING,
        },
        trackArt: {
            type: DataTypes.STRING,
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
