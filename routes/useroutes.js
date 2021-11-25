const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const AppError = require("../Utils/apperror");
const passport = require("passport");
const { registerForm, registerUser, loginForm, loggedIn, logOut } = require("../controllers/usercontrollers");



router.route("/register").get(registerForm)
    .post(wrapAsync(registerUser));

router.route("/login").get(loginForm)
    .post(passport.authenticate('local',
        { failureFlash: true, failureRedirect: "/login" }), loggedIn);

router.get("/logout", logOut)

module.exports = router;