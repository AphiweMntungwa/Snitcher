const User = require("../models/user");

module.exports.registerForm = (req, res) => {
    res.render("./user/register");
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next();
            req.flash("success", `Successfully Registered ${username}`);
            res.redirect("/index");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register")
    }
}

module.exports.loginForm = (req, res) => {
    res.render("./user/login");
}

module.exports.loggedIn = (req, res) => {
    req.flash("success", "Successfully logged in");
    const redirectUrl = req.session.continueTo || "/index";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/index");
}