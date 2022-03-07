const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const photoSchema = new Schema({
    url: String,
    filename: String
})
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: photoSchema,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);