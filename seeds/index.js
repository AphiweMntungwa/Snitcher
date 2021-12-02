const mongoose = require("mongoose");
const Campground = require("../models/campgrounds");
const cities = require("./cities");
const { descriptors, places, lorem } = require("./seedhelpers");

mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

const seedData = async() => {
    await Campground.deleteMany({});
    const rand = () => {
        return Math.floor(Math.random() * 1000)
    };
    const arr = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };
    for (let i = 0; i < 10; i++) {
        const camp = new Campground({
            location: `${cities[rand()].city}, ${cities[rand()].state}`,
            title: `${arr(descriptors)} ${arr(places)}`,
            price: 14,
            images: [{
                    url: 'https://res.cloudinary.com/snitcher/image/upload/v1638445630/YelpCamp/mhnupy7sqjmcvgotcybe.png',
                    filename: 'YelpCamp/mhnupy7sqjmcvgotcybe'
                },
                {
                    url: 'https://res.cloudinary.com/snitcher/image/upload/v1638445630/YelpCamp/actvkvdinscunhur58ax.png',
                    filename: 'YelpCamp/actvkvdinscunhur58ax'
                }
            ],
            description: lorem,
            author: { _id: "619abf59ccd20e2dbc8fb466" }
        })
        await camp.save()
    }
};

seedData().then(() => { mongoose.connection.close() });