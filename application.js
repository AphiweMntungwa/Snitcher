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

const User = require("./models/user");
const passport = require("passport");
const Strategy = require("passport-local");

const dbUrl = 'mongodb://localhost:27017/YelpCamp' || process.env.DB_URL;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
}));


const MongoStore = require("connect-mongo")(session);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("the app is conscious on port", port);
})


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
    // store,
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

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
});

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