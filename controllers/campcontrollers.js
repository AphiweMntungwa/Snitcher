const Thought = require("../models/thoughts");

module.exports.listItems = async(req, res) => {
    const list = await Thought.find({}).populate({ path: 'author' });
    res.json({ list });
}

module.exports.vote = async(req, res) => {
    const { id } = req.params;
    const { like = false, dislike = false } = req.body;
    const post = await Thought.findById(id);
    const { likes, dislikes } = post;
    if (like) {
        !(likes.user.includes(req.user._id)) && likes.user.push(req.user._id)
        dislikes.user = dislikes.user.filter(el => el != req.user._id);
        await post.save().then(() => res.send({ liked: true }));
    } else if (dislike) {
        !(dislikes.user.includes(req.user._id)) && dislikes.user.push(req.user._id)
        likes.user = likes.user.filter(el => el != req.user._id);
        await post.save().then(() => res.send({ disliked: true }))
    }
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
        res.send({ createdPost: true })
    }).catch(() => res.send({ createdPost: false }))
}

module.exports.editItem = async(req, res, next) => {
    const { id } = req.params;
    const { arr, body } = req.body;
    const post = await Thought.findById(id).populate('author');
    post.post = body;
    arr.length && arr.forEach(el => post.media.push(el));
    await post.save().then(() => {
        res.send({ edited: true, post })
    }).catch(e => {
        res.send({ edited: false, message: 'dont panic man', e })
    })
}

module.exports.deleteItem = async(req, res) => {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);
    const newList = await Thought.find({});
    res.send({ deleted: true, list: newList });
}