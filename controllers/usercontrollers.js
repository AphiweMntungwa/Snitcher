const User = require("../models/user");

module.exports.registerUser = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (username.length <= 2 || password.length <= 5) {
            res.redirect("/register", { message: "password must be at least 5 characters long" });
        } else {
            const { path = 'https://res.cloudinary.com/snitcher/image/upload/v1646391331/Snitcher/profile-placeholder_nynr1c.png', filename = 'Snitcher/profile-placeholder_nynr1c.png' } = req.file;
            const newUser = new User({ username, email });
            newUser.photo = { url: path, filename }
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, async(err) => {
                if (err) { return next() } else {
                    const user = await User.find({ username: req.body.username });
                    req.session.user = user;
                    res.redirect('/');
                }
            });
        }
    } catch (e) {
        res.send({ meaasge: 'fuckstick biatch' })
        res.redirect("/register")
    }
}

module.exports.loggedIn = async(req, res) => {
    const user = await User.find({ username: req.body.username });
    req.session.user = user;
    res.redirect('/');
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