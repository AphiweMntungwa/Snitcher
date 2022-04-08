const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const { isLoggedIn } = require("../middleware/logmiddleware");
const { getMessage, writeMessage } = require("../controllers/message");

router.get('/:sender/:receiver', isLoggedIn, wrapAsync(getMessage))
router.post("/:sender/:receiver", isLoggedIn, wrapAsync(writeMessage))

module.exports = router;