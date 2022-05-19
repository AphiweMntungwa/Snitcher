if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
console.log(1)
const express = require("express");
console.log(2)

const app = express();
const AppError = require("./Utils/apperror");
const mongoSanitize = require("express-mongo-sanitize");
const path = require('path');
console.log(3)

console.log(4)

console.log(5)

console.log('6 a')




// const dbUrl = '' //process.env.DB_URL || 'mongodb://localhost:27017/YelpCamp'

// const campgroundRoutes = require("./routes/postroutes");
// const commentRoutes = require("./routes/commentRoutes");
// const userRoutes = require("./routes/useroutes");
// const videoroutes = require("./routes/videoroutes")
// const messageRoutes = require("./routes/messageroutes")
console.log(6)

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
    name: 'inspector',
    resave: false,
    saveUninitialized: true,
    secret: 'countdownisbelowone',
    cookie: {
        maxAge: Date.now() * 1000 * 60 * 60 * 24 * 7,
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());


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