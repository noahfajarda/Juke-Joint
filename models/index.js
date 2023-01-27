// index.js establishes relationships between the models,
//and also creates the foreign key constraights without explicitly setting them in the Models
const User = require("./User");
const Comment = require("./Comment");
const SearchedSong = require("./SearchedSong");
const Artists = require("./Artists");
const ListOfPlaylists = require("./ListOfPlaylists");
const Playlist = require("./Playlist");
const Likes = require("./Likes");

//Comments will also have a userId field connecting to the user table's id column
//If a user gets deleted, all their comments will be deleted as well
Comment.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// USER/PLAYLIST == ONE-TO-MANY
User.hasMany(Playlist, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Playlist.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

// USER/LIKES == ONE-TO-MANY
User.hasMany(Likes, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Likes.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

//exports all 3 models as a module
module.exports = {
    User,
    Comment,
    SearchedSong,
    Artists,
    ListOfPlaylists,
    Playlist
};
