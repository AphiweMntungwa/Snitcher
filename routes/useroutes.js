const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const passport = require("passport");
const { registerUser, loggedIn, logOut, users } = require("../controllers/usercontrollers");
const { cloudStore } = require("../cloudstorage/main");
const multer = require("multer");
const upload = multer({ storage: cloudStore });

router.route("/register").post(upload.single(`profileImage`), ((req, res, next) => {
    console.log('aphiwe here', req.body);
    console.log(req.files);
    console.log(cloudStore)
    console.log(req.files.filename)
    next();
}), wrapAsync(registerUser));
router.get("/users", wrapAsync(users))
router.route("/login")
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), loggedIn);

router.get("/logout", logOut)

module.exports = router;