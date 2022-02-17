const express = require("express");
const router = express.Router();
const Song = require("../models/Song")



router.post('/:id', async (req, res) => {//adding new song to shadow list
    const isSong = await Song.findOne({ id: req.params.id });
    let newSong
    if (!isSong) { newSong = await new Song({ ...req.body }).save(); }
    res.send({ message: "OK", newSong });
})



router.get('/', async (req, res) => {// דלת אחורית
    let songList = await Song.find({})
    function findUnique(arr, predicate) {
        let found = {};
        arr.forEach(d => {
            found[predicate(d)] = d;
        });
        return Object.keys(found).map(key => found[key]);
    }
    let result = findUnique(songList, d => d.id);
    res.send(result);
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