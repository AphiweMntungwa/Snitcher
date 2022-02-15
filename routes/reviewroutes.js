const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const { isLoggedIn, validateReview, isReviewOwner } = require("../middleware/logmiddleware");
const { makeReview, editReview, deleteReview } = require("../controllers/reviewcontrollers");





router.post("/", wrapAsync(makeReview)); //, isLoggedIn, validateReview

router.route("/:reviewId").put(isLoggedIn, isReviewOwner, wrapAsync(editReview))
    .delete(isLoggedIn, isReviewOwner, wrapAsync(deleteReview));

module.exports = router;