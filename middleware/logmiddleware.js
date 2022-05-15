const Thought = require("../models/thoughts");
const Comment = require("../models/comments");
const AppError = require("../Utils/apperror");
const { reviewSchema } = require("../schemas.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.status(401).send('You Must Be logged In')
    }
}

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    const item = await Thought.findById(id);
    if (!item.author.equals(req.session.user._id)) {
        return res.status(401).send({ isOwner: false });
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

module.exports.isCommentOwner = async(req, res, next) => {
    const { commentId: id } = req.params;
    const foundReview = await Comment.findById(id);
    if (!foundReview.author.equals(req.session.user._id)) {
        return res.send(401).json({ errorMessage: "You are not allowed" });
    }
    next();
}