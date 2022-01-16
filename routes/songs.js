const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const Song = require("../models/song")

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
// router.post('/mm', (req, res) => {

//     console.log("songs!!");
//     res.send('songs!');
// })

module.exports = router;