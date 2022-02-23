const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: String,
    likes: [{ user: String, count: Number }],
    dislikes: [{ user: String, count: Number }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Comment", commentSchema);