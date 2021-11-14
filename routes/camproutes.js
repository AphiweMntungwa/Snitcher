const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapasync");
const AppError = require("../Utils/apperror");
const { campgroundSchema} = require("../schemas.js");
const Campground = require("../models/campgrounds");
const methodOverride = require("method-override");

router.use(express.urlencoded({extended:true}));
router.use(methodOverride("_method"));
router.use(express.json());



validateSchema = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}

router.get("/", wrapAsync(async (req, res) => {
    const list = await Campground.find({});
    res.render("./campgrounds/index", { list });
}));

router.get("/new", (req, res) => {
    res.render("./campgrounds/newcamp");
});

router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id).populate("reviews");
    selectCamp ? res.render("./campgrounds/details", { selectCamp })
        : next(new AppError("Camp Not Found", 400))
}));

router.post("/", validateSchema, wrapAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save().then(() => {
        res.redirect(`/index/${newCamp._id}`)
    });
}));

router.get("/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id);
    selectCamp ? res.render("./campgrounds/editcamp", { selectCamp })
        : next(new AppError("Camp Not Found", 400))
}));

router.patch("/:id", validateSchema, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/index/${id}`);
}));

router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/index");
}));

module.exports = router;