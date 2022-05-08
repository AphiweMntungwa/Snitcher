const User = require("../models/user");
const bcrypt = require('bcrypt');


module.exports.profilePhoto = async(req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    const { url, filename } = req.file;
    findUser.photo = { url, filename }
    findUser.save().then(() => res.send(findUser)).catch(e => console.log(e))
}

module.exports.registerUser = async(req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const exists = await User.findOne({ email });
    if (exists) { return res.send({ signed: false, message: 'user exists' }) }
    const user = new User({
        username,
        email,
        password: hash
    })
    const { path, filename } = req.file ? req.file : { path: false, filename: false };
    if (path) {
        user.photo = { url: path, filename };
    }
    user.save().then(() => {
        req.session.user = user;
        res.send(user)
    }).catch(e => console.log(e));
};

module.exports.isUser = async(req, res) => {
    const user = await User.find({ username: req.body.username });
    req.session.user = user;
    req.session.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('http://localhost:3000')
        }
    })
}

module.exports.isLogged = async(req, res) => {
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