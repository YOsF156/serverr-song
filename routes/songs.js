const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();
const Song = require("../models/Song")
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post('/', authJWT, async (req, res) => {
    const isSong = await Song.findOne({ user: `${req.user._id}`, id: req.body.id });
    if (isSong) return res.status(500).json({ message: "the song is already in the main playlist" });
    let newSong = await new Song({ ...req.body, user: `${req.user._id}` }).save();
    res.send(newSong);

})

router.get('/', authJWT, async (req, res) => {
    let songList = await Song.find({})
    songList = songList.filter(song => song.user === req.user._id)
    res.send(songList);

})

// router.put('/', async (req, res) => {
//     console.log(req.body);
//     let songList = await Song.find({})
//     res.send(songList);
// })

router.delete("/:id", authJWT, async (req, res) => {
    let song = await Song.findOne({ user: req.user._id, id: req.params.id });
    if (!song) return res.status(400);
    console.log(song)
    if (song) {
        deletedSong = await Song.deleteOne({ user: req.user._id, id: req.params.id });
        return res.send({ message: "OK", deletedSong });
    }
    return res.status(401);
});

module.exports = router;