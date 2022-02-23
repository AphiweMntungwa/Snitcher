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


module.exports.deleteComment = async(req, res) => {
    const { id, commentId } = req.params;
    await Thought.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId).then(() => {
        res.json({ deleted: true });
    }).catch((e) => {
        res.json({ error: e, customMessage: "could not delete" })
    })
}