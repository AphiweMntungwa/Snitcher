const mongoose = require("mongoose");
const Campground = require("../models/campgrounds");
const cities = require("./cities");
const { descriptors, places, lorem } = require("./seedhelpers");

mongoose.connect('mongodb://localhost:27017/YelpCamp',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

const seedData = async () => {
    await Campground.deleteMany({});
    const rand = () => {
        return Math.floor(Math.random() * 1000)
    };
    const arr = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };
    for (let i = 0; i < 50; i++) {
        const camp = new Campground({
            location: `${cities[rand()].city}, ${cities[rand()].state}`,
            title: `${arr(descriptors)} ${arr(places)}`,
            price: 14,
            image: "https://source.unsplash.com/random",
            description: lorem
        })
        await camp.save()
    }
};

seedData().then(() => { mongoose.connection.close() });