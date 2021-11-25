const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapasync");
const methodOverride = require("method-override");
const { isLoggedIn, isOwner, validateSchema } = require("../middleware/logmiddleware");
const { listItems, showItem, createForm, createItem, editForm, editItem, deleteItem } = require("../controllers/campcontrollers");


router.use(express.urlencoded({ extended: true }));
router.use(methodOverride("_method"));
router.use(express.json());

router.route("/").get(wrapAsync(listItems))
    .post(isLoggedIn, validateSchema, wrapAsync(createItem));

router.get("/new", isLoggedIn, createForm);

router.route("/:id").get(wrapAsync(showItem))
    .patch(isLoggedIn, isOwner, validateSchema, wrapAsync(editItem))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteItem));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editForm));

module.exports = router;