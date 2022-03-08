const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const AppError = require("../Utils/apperror");
const passport = require("passport");
const { registerUser, loggedIn, logOut, users } = require("../controllers/usercontrollers");
const { cloudStore } = require("../cloudstorage/main");
const multer = require("multer");
const upload = multer({ storage: cloudStore });

router.route("/register").post(upload.single('profileImage'), wrapAsync(registerUser));
router.get("/users", wrapAsync(users))
router.route("/login")
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), loggedIn);

router.get("/logout", logOut)

module.exports = router;