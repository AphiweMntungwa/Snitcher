const User = require("../models/user");

module.exports.registerUser = async(req, res, next) => {
    try {
        const { username, email, password, photo = '' } = req.body;
        if (username.length <= 2 || password.length <= 5) {
            req.flash("error", "password must be at least 5 characters long");
            res.redirect("/register");
        } else {
            const newUser = new User({ username, email, photo });
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, async(err) => {
                if (err) { return next() } else {
                    const user = await User.find({ username: req.body.username });
                    req.session.user = user;
                    const redirectUrl = req.session.continueTo || "/index";
                    res.redirect(redirectUrl === '/index' ? '/' : redirectUrl);
                }
            });
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register")
    }
}

module.exports.loggedIn = async(req, res) => {
    const user = await User.find({ username: req.body.username });
    req.session.user = user;
    const redirectUrl = req.session.continueTo || "/index";
    res.redirect(redirectUrl === '/index' ? '/' : redirectUrl);
}

module.exports.logOut = (req, res) => {
    console.log('yay you made it this far')
    try {
        req.session.user = undefined;
        res.send({ message: 'logged you out' })
    } catch (e) {
        res.send({ message: 'something went wrong' })
    }
}