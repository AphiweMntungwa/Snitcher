const { cloudinary } = require('../cloudstorage/main')
const User = require("../models/user");
const bcrypt = require('bcrypt');


module.exports.describeUser = async(req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
        res.status(400).send('Empty Fields');
    }
    const findUser = await User.findById(id);
    findUser.description = description;
    findUser.save().then(() => {
        req.session.user = findUser;
        res.send({ described: true });
    }).catch(e => res.status(500).send(e))
}

module.exports.changeProfile = async(req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    const { path, filename } = req.file ? req.file : { path: false, filename: false };
    await cloudinary.uploader.destroy(findUser.photo.filename);
    findUser.photo = { url: path, filename }
    findUser.save().then(() => {
        req.session.user = findUser;
        res.send({ changedProfile: true })
    }).catch(e => res.status(500).send(e))
}

module.exports.registerUser = async(req, res, next) => {
    console.log(12)
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const exists = await User.findOne({ email });
    if (exists) { return res.status(400).send('email exists') }
    if (password.length < 6) {
        res.status(400).send('password is too short.');
    }
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
        req.session.save(function(err) {
            if (err) {
                return res.status(500).send(err.message)
            }
            res.send(user)
        })
    }).catch(e => res.status(400).send(e.message));
};

module.exports.isUser = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    user ? bcrypt.compare(password, user.password, function(err, response) {
        if (err) {
            return res.status(405).send(err.message)
        }
        if (response) {
            req.session.user = user;
            req.session.save(function(err) {
                if (err) {
                    return res.status(500).send(err.message)
                }
                res.send({ loggedIn: true })
            })

        } else {
            return res.status(400).json({ success: false, message: 'incorrect username or password' });
        }
    }) : res.status(400).json({ success: false, message: 'incorrect username or password' });
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
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send(err.message)
            } else {
                res.send({ loggedIn: false })
            }
        });
    }
    res.end();
}

module.exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    await cloudinary.uploader.destroy(findUser.photo.filename);
    req.session.user = null;
    await User.findOneAndDelete({ _id: id });
    res.send({ deleted: true })
}