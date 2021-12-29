const Thought = require("../models/thoughts");
const Review = require("../models/reviews");
const AppError = require("../Utils/apperror");
const { campgroundSchema, reviewSchema } = require("../schemas.js");



module.exports.validateSchema = (req, res, next) => {
    // delete req.body.images;
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

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
        req.flash("error", "You are not allowed");
        return res.redirect(`/index/${item._id}`);
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

module.exports.isReviewOwner = async(req, res, next) => {
    const { reviewId: id } = req.params;
    const foundReview = await Review.findById(id);
    if (!foundReview.author.equals(req.user._id)) {
        return res.json({ errorMessage: "You are not allowed" });
    }
    next();
}