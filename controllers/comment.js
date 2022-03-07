const Thought = require("../models/thoughts");
const Comment = require("../models/comments");
const User = require("../models/user");

module.exports.writeComment = async(req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    const post = await Thought.findById(id);
    let comment = new Comment({ body, author: req.user._id });
    post.comments.push(comment);
    await post.save();
    await comment.save().then(async() => {
        const author = await User.findById(post.author);
        return res.json({ comment, author });
    }).catch(e => {
        return res.json({ message: `don't panic ${e}` });
    })
}

module.exports.getComment = async(req, res) => {
    const { id } = req.params;
    const post = await Thought.findById(id).populate({
        path: 'comments',
        populate: 'author'
    });
    res.send({ comments: post.comments })
}

module.exports.vote = async(req, res) => {
    const { id } = req.params;
    const { like = false, dislike = false } = req.body;
    const comment = await Comment.findById(id);
    const { likes, dislikes } = comment;
    if (like) {
        !(likes.user.includes(req.user._id)) && likes.user.push(req.user._id)
        dislikes.user = dislikes.user.filter(el => el != req.user._id);
        await comment.save().then(() => res.send({ liked: true }));
    } else if (dislike) {
        !(dislikes.user.includes(req.user._id)) && dislikes.user.push(req.user._id)
        likes.user = likes.user.filter(el => el != req.user._id);
        await comment.save().then(() => res.send({ disliked: true }))
    }
}

module.exports.deleteComment = async(req, res) => {
    const { id, commentId } = req.params;
    await Thought.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId).then(() => {
        res.json({ deleted: true });
    }).catch((e) => {
        res.json({ error: e, customMessage: "could not delete" })
    })
}