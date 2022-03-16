const User = require("../models/user");

module.exports.profilePhoto = async(req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    const { url, filename } = req.file;
    findUser.photo = { url, filename }
    findUser.save().then(() => res.send(findUser)).catch(e => console.log(e))
}

module.exports.registerUser = async(req, res, next) => {
    console.log(req.body)
    try {
        const { username, email, password } = req.body;
        if (username.length <= 2 || password.length <= 5) {
            res.redirect("https://snitcherapp.herokuapp.com/register", { message: "password must be at least 5 characters long" });
        } else {
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            registeredUser.photo = { url: 'https://res.cloudinary.com/snitcher/image/upload/v1646391331/Snitcher/profile-placeholder_nynr1c.png', filename: 'Snitcher/profile-placeholder_nynr1c.png' }
            req.login(registeredUser, async(err) => {
                if (err) { return next() } else {
                    const user = await User.find({ username: req.body.username });
                    req.session.user = user;
                    req.session.save(err => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('https://snitcherapp.herokuapp.com')
                        }
                    });
                }
            });
        }
    } catch (e) {
        console.log(e)
        res.redirect("https://snitcherapp.herokuapp.com/register")
    }
}

module.exports.loggedIn = async(req, res) => {
    const user = await User.find({ username: req.body.username });
    req.session.user = user;
    req.session.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('https://snitcherapp.herokuapp.com')
        }
    })
}

module.exports.isLogged = async(req, res) => {
    console.log(req.session)
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
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