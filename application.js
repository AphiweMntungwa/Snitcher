if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const AppError = require("./Utils/apperror");
const mongoSanitize = require("express-mongo-sanitize");

const campgroundRoutes = require("./routes/camproutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/useroutes");
const videoroutes = require("./routes/videoroutes")
const messageRoutes = require("./routes/messageroutes")

const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');


const User = require("./models/user");
const passport = require("passport");
const Strategy = require("passport-local");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp';
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("the app is conscious on port", port);
})

const cors = require('cors');
app.use(cors({
    origin: 'https://snitcherapp.herokuapp.com',
    methods: '*',
    credentials: true
}));

const MongoStore = require("connect-mongo")(session);
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(busboyBodyParser());
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
        httpOnly: false,
        // expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", userRoutes);
app.use("/index", campgroundRoutes);
app.use("/index/:id", commentRoutes);
app.use("/search", videoroutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
    res.render("./campgrounds/home");
});

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500 } = err;
    res.status(status).render("error", { err });
});