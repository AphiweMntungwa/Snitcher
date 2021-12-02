const Campground = require("../models/campgrounds");


module.exports.listItems = async(req, res) => {
    const list = await Campground.find({});
    res.render("./campgrounds/index", { list });
}

module.exports.createForm = (req, res) => {
    res.render("./campgrounds/newcamp");
}

module.exports.showItem = async(req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!selectCamp) {
        req.flash("error", "Could not find Campground")
        res.redirect("/index");
    } else {
        res.render("./campgrounds/details", { selectCamp })
    }
}

module.exports.createItem = async(req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    newCamp.images = req.files.map(fl => ({ url: fl.path, filename: fl.filename }));
    newCamp.author = req.user._id;
    await newCamp.save().then(() => {
        res.redirect(`/index/${newCamp._id}`)
    });
}

module.exports.editForm = async(req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Campground.findById(id);
    if (!selectCamp) {
        req.flash("error", "Could not find Campground")
        res.redirect("/index");
    } else {
        res.render("./campgrounds/editcamp", { selectCamp })
    }
}

module.exports.editItem = async(req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/index/${id}`);
}

module.exports.deleteItem = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted Campground");
    res.redirect("/index");
}