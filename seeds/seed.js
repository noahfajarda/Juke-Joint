const sequelize = require("../config/connection");
const { Comment, Post, SearchedSong, User } = require("../models");

// const driverSeedData = require('./driverSeedData.json');
const searchedSongSeedData = require("./searchedSongSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const searchedSong = await SearchedSong.bulkCreate(searchedSongSeedData);

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
