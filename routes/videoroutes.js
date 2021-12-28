const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapasync");
const axios = require("axios");
const Thought = require('../models/thoughts');



router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", wrapAsync(async(req, res) => {
    let { term: youtubeVid } = req.body;
    youtubeVid = youtubeVid.trim();
    await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: youtubeVid,
                key: process.env.YOUTUBE_API_KEY,
                maxResults: 10
            }
        })
        .then(response => {
            // console.log(response.data.items[0].snippet.thumbnails.default.url)
            res.json(response.data)
        })
        .catch(e => res.send(`request error ${e}`));
}))

router.delete("/:id/delete", wrapAsync(async(req, res) => {
    const { id } = req.params;
    const { imgSource: src } = req.body;
    const selectThought = await Thought.findById(id)
    const index = selectThought.media.indexOf(src)

    if (index !== -1) {
        selectThought.media.splice(index, 2)
        newArray = [...selectThought.media]
        await Thought.findByIdAndUpdate(id, { media: newArray })
        res.json({ message: 'successful' })
    } else {
        res.json({ errorMessage: `Post not found` })
    }
}))

module.exports = router;