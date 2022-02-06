const express = require("express");
const router = express.Router();
const Song = require("../models/Song")


router.post('/:id', async (req, res) => {
    const isSong = await Song.findOne({ id: req.params.id });
    if (isSong) break;
    let newSong = await new Song({ ...req.body }).save();
    res.send({ message: "OK", newSong });
})

router.get('/', async (req, res) => {// דלת אחורית
    let songList = await Song.find({})
    res.send(songList);
})


router.delete("/:id", async (req, res) => {// למחיקת אחורית למחיקת שיר
    let song = await Song.findOne({ id: req.params.id });
    if (!song) return res.status(400);
    console.log(song)
    if (song) {
        deletedSong = await Song.deleteOne({ id: req.params.id });
        return res.send({ message: "OK delete successfully", deletedSong });
    }
});

module.exports = router;