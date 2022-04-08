const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const passport = require("passport");
const { registerUser, loggedIn, logOut, users, isLogged } = require("../controllers/usercontrollers");
const { cloudStore } = require("../cloudstorage/main");
const multer = require("multer");
const upload = multer({ storage: cloudStore });

router.post("/register/:id/profilephoto", upload.single(`profileImage`))
router.route("/register").post(wrapAsync(registerUser));
router.get("/users", wrapAsync(users))
router.route("/login").get(isLogged).post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), loggedIn);

router.get("/logout", logOut)

module.exports = router;