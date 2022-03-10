const User = require("../models/user");
const session = require('../application')

module.exports.profilePhoto = async(req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    const { url, filename } = req.file;
    findUser.photo = { url, filename }
    findUser.save().then(() => res.send(findUser)).catch(e => console.log(e))
}

module.exports.registerUser = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (username.length <= 2 || password.length <= 5) {
            res.redirect("/register", { message: "password must be at least 5 characters long" });
        } else {
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            registeredUser.photo = { url: 'https://res.cloudinary.com/snitcher/image/upload/v1646391331/Snitcher/profile-placeholder_nynr1c.png', filename: 'Snitcher/profile-placeholder_nynr1c.png' }
            req.login(registeredUser, async(err) => {
                if (err) { return next() } else {
                    const user = await User.find({ username: req.body.username });
                    req.session.user = user;

                    res.redirect('https://snitcherapp.herokuapp.com');
                }
            });
        }
    } catch (e) {
        console.log(e)
        res.redirect("/register")
    }
}

module.exports.loggedIn = async(req, res) => {
    const user = await User.find({ username: req.body.username });
    req.session.user = user;
    req.session.save((err) => {
        if (!err) {
            console.log(req.session);
            session = req.session.user
            res.redirect('https://snitcherapp.herokuapp.com');
        }
    })
}
module.exports.isLogged = async(req, res) => {
    if (session) {
        res.send({ loggedIn: true, user: session })
    } else {
        res.send({ loggedIn: false })
    }
}

module.exports.users = async(req, res) => {
    const users = await User.find({});
    res.send(users);
}

module.exports.logOut = (req, res) => {
    try {
        req.session.user = undefined;
        res.send({ message: 'logged you out' })
    } catch (e) {
        res.send({ message: 'something went wrong' })
    }
}