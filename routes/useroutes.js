const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
// const AppError = require("../Utils/apperror");
const passport = require("passport");
const { registerUser, loggedIn, logOut, users } = require("../controllers/usercontrollers");
const { cloudStore } = require("../cloudstorage/main");
const multer = require("multer");
const upload = multer().single('profileImage');
// const upload = multer({ storage: cloudStore });

router.route("/register").post(function() {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
        } else if (err) {
            console.log('hey hey', err)
        }
        console.log('its all okay')
    })
}), ((req, res, next) => {
    console.log('aphiwe here', req.body);
    console.log(req.file);
    next();
}), wrapAsync(registerUser);

router.get("/users", wrapAsync(users))
router.route("/login")
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), loggedIn);

router.get("/logout", logOut)

module.exports = router;