const Thought = require("../models/thoughts");


module.exports.listItems = async(req, res) => {
    const list = await Thought.find({}).populate({ path: 'author' });
    res.json({ list });
}

module.exports.showItem = async(req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Thought.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!selectCamp) {
        req.flash("error", "Could not find thought")
        res.redirect("/index");
    } else {
        res.render("./campgrounds/details", { selectCamp })
    }
}

module.exports.createItem = async(req, res, next) => {
    const { text, arr } = req.body;
    const newPost = new Thought({ post: text, media: arr });
    newPost.author = req.user._id;
    await newPost.save().then(() => {
        res.json({ message: 'Post created' })
    });
}

// module.exports.editForm = async(req, res, next) => {
//     const { id } = req.params;
//     const selectCamp = await Thought.findById(id);
//     if (!selectCamp) {
//         req.flash("error", "Could not find thought")
//         res.redirect("/index");
//     } else {
//         res.render("./campgrounds/editcamp", { selectCamp })
//     }
// }

module.exports.editItem = async(req, res, next) => {
    const { id } = req.params;
    const selectCamp = await Thought.findById(id);
    // const photoEdit = req.files.map(fl => ({ url: fl.path, filename: fl.filename }));
    // selectCamp.images.push(...photoEdit);
    // await selectCamp.save()
    await Thought.findByIdAndUpdate(id, req.body.thought);
    res.redirect(`/index/${id}`);
}

module.exports.deleteItem = async(req, res) => {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);
    req.flash("success", "Deleted Campground");
    res.redirect("/index");
}