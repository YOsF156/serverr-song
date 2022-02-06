const express = require("express");
const router = express.Router();
const UserPlaylist = require("../models/UserPlaylist")

router.post('/', async (req, res) => {
    // const isSong = await Song.findOne({ user: `${req.user._id}`, id: req.body.id });
    // if (isSong) return res.status(500).json({ message: "the song is already in the main playlist" });
    // let newSong = await new Song({ ...req.body, user: `${req.user._id}` }).save();
    // res.send(newSong);

})



module.exports = router;