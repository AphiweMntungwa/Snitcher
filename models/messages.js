const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    message: { text: { type: String, required: true }, sender: String },
    members: [String],
    created: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("Message", messageSchema);