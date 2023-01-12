const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SearchedSong extends Model {}
SearchedSong.init(
    {
        SearchedSongId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trackName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trackArtist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trackId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trackArt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "SearchedSong",
    }
);

module.exports = SearchedSong;
