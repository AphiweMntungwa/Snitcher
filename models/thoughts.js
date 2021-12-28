const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;


const thoughtSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // price: Number,
    description: String,
    media: Object,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

thoughtSchema.post("findOneAndDelete", async function(document) {
    if (document) {
        await Review.deleteMany({
            _id: { $in: document.reviews }
        })
    }
})
module.exports = mongoose.model("Thought", thoughtSchema);