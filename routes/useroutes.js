const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapasync");
const { registerUser, isUser, logOut, users, isLogged, changeProfile, describeUser } =
require("../controllers/usercontrollers");
const { cloudStore } = require("../cloudstorage/main");
const multer = require("multer");
const upload = multer({ storage: cloudStore });


router.route("/register").post(upload.single('profileImg'), wrapAsync(registerUser));
router.get("/users", wrapAsync(users))
router.route("/profile/:id").post(upload.single('profileImage'), wrapAsync(changeProfile))
    .patch(wrapAsync(describeUser))
router.route("/login").get(isLogged).post(isUser);

router.get("/logout", logOut)

module.exports = router;