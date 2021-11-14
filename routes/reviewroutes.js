const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds");
const Review = require("../models/reviews");
const { reviewSchema} = require("../schemas.js");
const wrapAsync = require("../Utils/wrapasync");
const AppError = require("../Utils/apperror");


validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }
    else {
        next();
    }
}

router.post("/", validateReview, wrapAsync(async (req, res) => {
    console.log("it works this far");
    const { id } = req.params;
    const newReview = new Review(req.body.campreview);
    const selectCamp = await Campground.findById(id);
    selectCamp.reviews.push(newReview);
    await selectCamp.save();
    await newReview.save().then(() => {
        res.json({ newReview });
    }).catch((e) => {
        res.json({ error: e, customMessage: "Could not Create Review" });
    })
}))
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId).then(() => {
        res.json({ deleted: "SUCCESS" });
    }).catch((e) => {
        res.json({ error: e, customMessage: "could not delete" })
    })
}))
router.put("/:reviewId", wrapAsync(async (req, res) => {
    const { id: campgroundId, reviewId } = req.params;
    const { rating, body } = req.body.reviews;

    if (rating && body.trim()) {
        await Review.findByIdAndUpdate(reviewId, req.body.reviews);
        res.json({ rating, body });
    } else {
        res.json({ customMessage: "could not find review" });
    }
}))

module.exports = router;