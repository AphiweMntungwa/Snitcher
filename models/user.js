const mongoose = require("mongoose");
const Thought = require('./thoughts')
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    url: String,
    filename: String
})
const userSchema = new Schema({
    username: { type: String, required: true, unique: false },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: photoSchema,
    description: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    password: String
});

userSchema.post("findOneAndDelete", async function(document) {
    if (document) {
        await Thought.deleteMany({
            _id: { $in: document.posts }
        })
    }
})


module.exports = mongoose.model("User", userSchema);