const sequelize = require("../config/connection");
const { Comment, Post, SearchedSong, User, Artists } = require("../models");

// const driverSeedData = require('./driverSeedData.json');
const searchedSongSeedData = require("./searchedSongSeedData.json");
const artistSeedData = require("./artistSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const searchedSong = await SearchedSong.bulkCreate(searchedSongSeedData);
    const artist = await Artists.bulkCreate(
        artistSeedData.map((artist) => ({ name: artist }))
    );

    // for (const { id } of searchedSong) {
    //     const newLicense = await License.create({
    //         driver_id: id,
    //     });
    // }

    // for (const car of carSeedData) {
    //     const newCar = await Car.create({
    //         ...car,
    //         // Attach a random driver ID to each car
    //         driver_id: searchedSong[Math.floor(Math.random() * drivers.length)].id,
    //     });
    // }

    process.exit(0);
};

seedDatabase();
