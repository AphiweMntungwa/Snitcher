const Thought = require("../models/thoughts");
const Comment = require("../models/comments");
const AppError = require("../Utils/apperror");
const { reviewSchema } = require("../schemas.js");




module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.originalUrl.search("/review") !== -1) {
            return res.json({ errorMessage: "You must be signed in" });
        }
        req.session.continueTo = req.originalUrl;
        req.flash("error", "you must be signed in");
        return res.redirect("/login");
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    const item = await Thought.findById(id);
    if (!item.author.equals(req.user._id)) {
        return res.send({ isOwner: false });
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
    if (!foundReview.author.equals(req.user._id)) {
        return res.json({ errorMessage: "You are not allowed" });
    }
    next();
}