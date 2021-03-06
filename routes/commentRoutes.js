const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const { isLoggedIn, validateReview, isCommentOwner } = require("../middleware/logmiddleware");
const { writeComment, deleteComment, getComment, vote } = require("../controllers/comment");


router.post("/comments", isLoggedIn, wrapAsync(writeComment))
router.get('/comments', wrapAsync(getComment))
router.post('/comments/vote', wrapAsync(vote))

router.delete("/comments/:commentId", isLoggedIn, isCommentOwner, wrapAsync(deleteComment));

module.exports = router;