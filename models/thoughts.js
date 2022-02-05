const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;


const thoughtSchema = new Schema({
    post: String,
    media: Array,
    created: { type: Date, default: () => new Date() },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: Number,
    downvotes: Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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