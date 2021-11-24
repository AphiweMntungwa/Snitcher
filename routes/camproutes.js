const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapasync");
const Campground = require("../models/campgrounds");
const methodOverride = require("method-override");
const { isLoggedIn, isOwner, validateSchema } = require("../middleware/logmiddleware");


router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));
router.use(express.json());

router.get("/", wrapAsync(async (req, res) => {
    const list = await Campground.find({});
    res.render("./campgrounds/index", { list });
}));

router.get("/new", isLoggedIn, (req, res) => {
    res.render("./campgrounds/newcamp");
});

router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!selectCamp) {
        req.flash("error", "Could not find Campground")
        res.redirect("/index");
    } else {
        res.render("./campgrounds/details", { selectCamp })
    }
}));

router.post("/", isLoggedIn, validateSchema, wrapAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    newCamp.author = req.user._id;
    await newCamp.save().then(() => {
        res.redirect(`/index/${newCamp._id}`)
    });
}));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id);
    if (!selectCamp) {
        req.flash("error", "Could not find Campground")
        res.redirect("/index");
    } else {
        res.render("./campgrounds/editcamp", { selectCamp })
    }
}));


router.patch("/:id", isLoggedIn, isOwner, validateSchema, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/index/${id}`);
}));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted Campground");
    res.redirect("/index");
}));

module.exports = router;