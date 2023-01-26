const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Playlist extends Model {}
Playlist.init(
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
        modelName: "Playlist",
    }
);

module.exports = Playlist;
