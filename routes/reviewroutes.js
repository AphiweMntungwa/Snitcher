const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campgrounds");
const Review = require("../models/reviews");
const wrapAsync = require("../Utils/wrapasync");
const { isLoggedIn, validateReview, isReviewOwner } = require("../middleware/logmiddleware");
const User = require("../models/user");




router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const creatReview = req.body.campreview;
    const selectCamp = await Campground.findById(id);
    creatReview.author = req.user._id;
    newReview = new Review(creatReview);
    selectCamp.reviews.push(newReview);
    await selectCamp.save();
    await newReview.save().then(async () => {
        const author = await User.findById(creatReview.author);
        return res.json({ newReview, author });
    }).catch((e) => {
        console.log(e)
        return res.json({ error: e, customMessage: "Could not Create Review" });
    })
}))

router.delete("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId).then(() => {
        res.json({ deleted: "SUCCESS" });
    }).catch((e) => {
        res.json({ error: e, customMessage: "could not delete" })
    })
}))

router.put("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(async (req, res) => {
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