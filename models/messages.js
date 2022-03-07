const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    message: { text: String, sender: String },
    members: [String]
});

module.exports = mongoose.model("Message", messageSchema);