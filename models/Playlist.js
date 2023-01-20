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
            // allowNull: false,
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
        modelName: "Playlist",
    }
);

module.exports = Playlist;
