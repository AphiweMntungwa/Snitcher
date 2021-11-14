const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const AppError = require("./Utils/apperror");
const campgroundRoutes = require("./routes/camproutes");
const reviewRoutes = require("./routes/reviewroutes");

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

app.use("/index", campgroundRoutes);
app.use("/index/:id/review", reviewRoutes);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("./campgrounds/home");
});


app.get("/test", (req, res) => {
    res.json({ message: "it works" });
});

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500 } = err;
    res.status(status).render("error", { err });
});