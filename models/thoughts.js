const mongoose = require("mongoose");
const Comment = require("./comments");
const Schema = mongoose.Schema;


const thoughtSchema = new Schema({
    post: { type: String, required: true },
    media: Array,
    created: { type: Date, default: () => new Date() },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: { user: [String] },
    dislikes: { user: [String] },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

thoughtSchema.post("findOneAndDelete", async function(document) {
    if (document) {
        await Comment.deleteMany({
            _id: { $in: document.comments }
        })
    }
})
module.exports = mongoose.model("Thought", thoughtSchema);