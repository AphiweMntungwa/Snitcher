const mongoose = require("mongoose");
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
    password: String
});

module.exports = mongoose.model("User", userSchema);