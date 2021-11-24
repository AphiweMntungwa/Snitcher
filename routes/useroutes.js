const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../Utils/wrapasync");
const AppError = require("../Utils/apperror");
const passport = require("passport");
router.get("/register", (req, res) => {
    res.render("./user/register");
})

router.post("/register", wrapAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next();
            req.flash("success", `Successfully Registered ${username}`);
            res.redirect("/index");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register")
    }
}));

router.get("/login", (req, res) => {
    res.render("./user/login");
})
router.post("/login", passport.authenticate('local',
    { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
        req.flash("success", "Successfully logged in");
        const redirectUrl = req.session.continueTo || "/index";
        res.redirect(redirectUrl);
    })

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/index");
})
module.exports = router;