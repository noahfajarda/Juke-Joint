const sequelize = require("../config/connection");
const { Comment, Post, SearchedSong, User, Artists } = require("../models");

// const driverSeedData = require('./driverSeedData.json');
const searchedSongSeedData = require("./searchedSongSeedData.json");
const artistSeedData = require("./artistSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // create seeds for 'SearchedSong' & 'Artists' models
    const searchedSong = await SearchedSong.bulkCreate(searchedSongSeedData);
    const artist = await Artists.bulkCreate(
        artistSeedData.map((artist) => ({ name: artist }))
    );
    process.exit(0);
};

seedDatabase();
