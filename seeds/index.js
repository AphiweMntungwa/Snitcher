const mongoose = require("mongoose");
const Thought = require("../models/thoughts");

mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

const seedData = async() => {
    await Thought.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const camp = new Thought({
            post: 'This is my post',
            media: [
                'https://i.ytimg.com/vi/lKkQdxC0-yI/default.jpg',
                'https://i.ytimg.com/vi/FOP5ATqgbzo/default.jpg',
            ],
            author: { _id: "619abf59ccd20e2dbc8fb466" }
        })
        await camp.save()
    }
};

seedData().then(() => { mongoose.connection.close() });