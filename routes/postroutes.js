const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapasync");
const methodOverride = require("method-override");
const { isLoggedIn, isOwner } = require("../middleware/logmiddleware");
const { listItems, createItem, editItem, deleteItem, vote, getPost } = require("../controllers/postcontrols");


router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));
router.use(express.json());

router.route('/:id/vote').post(isLoggedIn, wrapAsync(vote));

router.route("/").get(wrapAsync(listItems))
    .post(isLoggedIn, wrapAsync(createItem));

router.route("/:id").get(wrapAsync(getPost))
    .patch(isLoggedIn, isOwner, wrapAsync(editItem))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteItem))

router.post('/', wrapAsync(async(req, res) => {
    const newThought = new Thought(req.body.thought);
    newThought.author = req.user._id;
    await newThought.save().then(() => {
        res.redirect(`/index/${newThought._id}`)
    });
}))

module.exports = router;