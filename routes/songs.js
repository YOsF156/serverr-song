const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const Song = require("../models/Song")

router.post('/', async (req, res) => {
    console.log(req.body);
    let newSong = await new Song({ ...req.body }).save();
    res.send(newSong);

})

router.get('/', async (req, res) => {
    console.log(req.body);
    let songList = await Song.find({})
    res.send(songList);

})

// router.put('/', async (req, res) => {
//     console.log(req.body);
//     let songList = await Song.find({})
//     res.send(songList);
// })


router.delete("/:id", async (req, res) => {
    let song = await Song.findOne({ id: req.params.id });
    if (!song) {
        return res.status(401)
    } else {
        console.log(song);
        deletedSong = await Song.deleteOne({ id: req.params.id });
        return res.send({ message: "OK", deletedSong });
    }
});

module.exports = router;