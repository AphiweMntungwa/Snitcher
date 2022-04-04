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


const User = require("./models/user");
const passport = require("passport");
const Strategy = require("passport-local");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp';

const cors = require('cors');
app.use(cors({
    origin: ['http://snitcherapp.herokuapp.com', 'https://snitcherapp.herokuapp.com', 'http://localhost:3000'],
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'OPTIONS'],
    credentials: true
}));

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("the app is conscious on port", port);
})


const MongoStore = require("connect-mongo")(session);
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Oh nooo error!", err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());

const store = new MongoStore({
    url: dbUrl,
    secret: process.env.SECRET || 'iamintrouble',
    touchAfter: 24 * 3600
})
sessionConfig = {
    store,
    name: 'inspector',
    secret: process.env.CLOUDINARY_SECRET || 'iamintrouble',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24,
    }
}
app.use(session(sessionConfig));

store.on("error", function(e) {
    console.log('ERROR ON SESSION', e)
})


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

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500 } = err;
    res.status(status).render("error", { message });
});