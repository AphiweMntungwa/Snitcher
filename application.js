if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");

const app = express();
const AppError = require("./Utils/apperror");
const mongoSanitize = require("express-mongo-sanitize");
const path = require('path');
const mongoose = require('mongoose');



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp'


const session = require('express-session');
const cors = require('cors')
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

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

const store = new MongoStore({
    url: dbUrl,
    secret: process.env.SECRET || 'iamintrouble',
    touchAfter: 24 * 3600
})
store.on("error", function(e) {
    console.log('ERROR ON SESSION', e)
})

app.use(session({
    store,
    name: 'bagade',
    secret: 'istherestillhope',
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: 'lax',
        maxAge: Date.now() * 1000 * 60 * 60 * 24 * 7,
    }
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());

const campgroundRoutes = require("./routes/postroutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/useroutes");
const videoroutes = require("./routes/videoroutes")
const messageRoutes = require("./routes/messageroutes")

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