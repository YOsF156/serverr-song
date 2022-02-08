const express = require("express");
const router = express.Router();
const UserPlaylist = require("../models/UserPlaylist")


// router.get('/', async (req, res) => { // להוסיף נתיב משיכת כל השירים מהפלייליסט המרכזי //  משיכת כל שירי הפלייליסטים של היוזר מיד אחרי התחברות ראושנית.
//     let songLists = await UserPlaylist.find({})
//     songLists = songLists.filter(song => song.user === req.user._id)
//     res.send(songList);

// })

router.post('/:id', async (req, res) => {//הוספת שיר פעם ראשונה לפלייליסט
    const isSong = await UserPlaylist.findOne({ id: req.body.id });
    if (isSong) return res.status(500).json({ message: "the song is already in the main playlist" });
    let newSong = await new Song({ ...req.body, user: `${req.user._id}` }).save();
    res.send(newSong);

})


// הוספת שיר לפלייליסט קייםPUT
//הוספת שיר לפלייליסט חדשPOST 
//מחיקת שיר מפלייליסט קייםDELETE
//מחיקת פלייסט וכל השירים שלו DELETE




module.exports = router;