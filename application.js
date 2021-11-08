const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const Campground = require("./models/campgrounds");
const Review = require("./models/reviews");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AppError = require("./Utils/apperror");
const wrapAsync = require("./Utils/wrapasync");
const { campgroundSchema, reviewSchema } = require("./schemas.js");

mongoose.connect('mongodb://localhost:27017/YelpCamp',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

app.listen(3000, () => {
    console.log("the app is conscious");
})
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res, next)=>{
//     console.log("this request has been noted", req);
//     next()
// } );

validateSchema = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
}
validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }
    else {
        next();
    }
}

app.get("/", (req, res) => {
    res.render("./campgrounds/home");
});

app.get("/index", wrapAsync(async (req, res) => {
    const list = await Campground.find({});
    res.render("./campgrounds/index", { list });
}));

app.get("/index/new", (req, res) => {
    res.render("./campgrounds/newcamp");
});

app.get("/index/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id);
    selectCamp ? res.render("./campgrounds/details", { selectCamp })
        : next(new AppError("Camp Not Found", 400))
}));

app.post("/index", validateSchema, wrapAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save().then(() => {
        res.redirect(`/index/${newCamp._id}`)
    });
}));

app.get("/index/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id);
    selectCamp ? res.render("./campgrounds/editcamp", { selectCamp })
        : next(new AppError("Camp Not Found", 400))
}));

app.patch("/index/:id", validateSchema, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/index/${id}`);
}));

app.delete("/index/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndRemove(id);
    res.redirect("/index");
}));
app.post("/index/:id/review", validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const newReview = new Review(req.body.campreview);
    // console.log(newReview);
    const selectCamp = await Campground.findById(id);
    selectCamp.reviews.push(newReview);
    await selectCamp.save();
    await newReview.save().then(() => {
        res.redirect(`/index/${selectCamp._id}`);
    });
}))
app.get("index/:id/review",)

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500 } = err;
    res.status(status).render("error", { err });
});