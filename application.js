if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const AppError = require("./Utils/apperror");
const mongoSanitize = require("express-mongo-sanitize");
const { formdataPolyfill } = require('formdata-polyfill');

const campgroundRoutes = require("./routes/camproutes");
const reviewRoutes = require("./routes/reviewroutes");
const userRoutes = require("./routes/useroutes");
const videoroutes = require("./routes/videoroutes")

const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const passport = require("passport");
const Strategy = require("passport-local");
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp';

const MongoStore = require("connect-mongo")(session);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("the app is conscious on port", port);
})
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const store = new MongoStore({
    url: dbUrl,
    secret: process.env.SECRET || 'iamintrouble',
    touchAfter: 24 * 3600
})

store.on("error", function(e) {
    console.log('ERROR ON SESSION', e)
})

sessionConfig = {
    store,
    name: 'inspector',
    secret: process.env.CLOUDINARY_SECRET || 'iamintrouble',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use("/index", campgroundRoutes);
app.use("/index/:id/review", reviewRoutes);
app.use("/search", videoroutes);

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