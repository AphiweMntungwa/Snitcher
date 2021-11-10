const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;


const campgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

campgroundSchema.post("findOneAndDelete", async function (document){
    if (document) {
        await Review.deleteMany({
            _id: { $in: document.reviews }
        })
    }
})
module.exports = mongoose.model("Campground", campgroundSchema);