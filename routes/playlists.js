const express = require("express");
const Song = require("../models/Song");
const router = express.Router();
const UserPlaylist = require("../models/UserPlaylist")


// router.get('/', async (req, res) => { // להוסיף נתיב משיכת כל השירים מהפלייליסט המרכזי //  משיכת כל שירי הפלייליסטים של היוזר מיד אחרי התחברות ראושנית.
//     let songLists = await UserPlaylist.find({})
//     songLists = songLists.filter(song => song.user === req.user._id)
//     res.send(songList);

// }) 

router.get('/myPlaylist', async (req, res) => {
    const allPlaylist = await UserPlaylist.find({ userID: req.user._id }).populate("songsID");
    res.send(allPlaylist);
})

router.get('/myPlaylist/names', async (req, res) => {
    const allPlaylist = await UserPlaylist.find({ userID: req.user._id });
    const playlistName = allPlaylist.map(playlist => { return playlist.playlistName })
    res.send(playlistName);
})

router.post('/:id', async (req, res) => {//הוספת שיר פעם ראשונה לפלייליסט
    const userID = req.user._id;
    const songID = req.params.id
    let mainPlaylist = await UserPlaylist.findOne({ userID: userID, playlistName: "main playlist" });
    if (!mainPlaylist) {
        mainPlaylist = await new UserPlaylist({
            playlistName: "main playlist",
            userID: userID
        }).save();
    }
    const isSong = await Song.findOne({ id: songID }).select("_id");
    if (!isSong) return res.status(400).json({ message: "the song is unknown to me" });
    if (!mainPlaylist.songsID.includes(isSong._id)) {
        const addSongToMainPlaylist = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: mainPlaylist.playlistName }, { songsID: [...mainPlaylist.songsID, isSong._id] }, {
            new: true,
        })
        return res.send(addSongToMainPlaylist);
    }
    res.send({ isSong: isSong, mainPlaylist: mainPlaylist });

});

router.put(`/addSongTo/:listName/:id`, async (req, res) => {//adding new playlist name
    const playlistName = req.params.listName;
    const songID = req.params.id;
    const userID = req.user._id
    let playlist = await UserPlaylist.findOne({ userID: userID, playlistName: playlistName })
    if (!playlist) {//create a new playlist
        playlist = await new UserPlaylist({
            playlistName: playlistName,
            userID: userID
        }).save();
    }
    const song = await Song.findOne({ id: songID }).select("_id")
    console.log(song._id);
    if (!playlist.songsID.includes(song._id)) {
        const addSongTo = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: playlistName }, { songsID: [...playlist.songsID, song._id] }, {
            new: true,
        })
    }
    const allPlaylist = await UserPlaylist.find({ userID: req.user._id }).populate("songsID");
    res.send(allPlaylist);
});

router.put("/change/:listName", async (req, res) => {
    const newName = req.body;
    const userID = req.user._id
    const playlistName = req.params.listName
    const playlist = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: playlistName }, { playlistName: newName }, {
        new: true,
    });
    const allPlaylist = await UserPlaylist.find({ userID: req.user._id }).populate("songsID");
    res.send(allPlaylist);

})

router.delete(`/deleteSongFrom/:listName/:id`, async (req, res) => {//adding new playlist name
    const playlistName = req.params.listName;
    const songID = req.params.id;
    const userID = req.user._id
    let playlist = await UserPlaylist.findOne({ userID: userID, playlistName: playlistName }).populate("songsID");
    let songs = await playlist.songsID.map(song => { if (song.id !== songID) return song._id }).filter(id => id)
    playlist = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: playlistName }, { songsID: songs }, {
        new: true,
    });
    const allPlaylist = await UserPlaylist.find({ userID: userID }).populate("songsID");
    res.send(allPlaylist);
})

router.delete(`/:listName`, async (req, res) => {//adding new playlist name
    const playlistName = req.params.listName;
    if (playlistName != "main playlist") {

        const userID = req.user._id
        let playlist = await UserPlaylist.findOneAndDelete({ userID: userID, playlistName: playlistName });
        res.send(playlist);
    }
    else { res.send("you can't delete the main playlist") }
})


// const song = await Song.findOne({ id: songID }).select("_id")
// console.log(song._id);
// if (!playlist.songsID.includes(song._id)) {
//     const addSongTo = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: playlistName }, { songsID: [...playlist.songsID, song._id] }, {
//         new: true,
//     })
// }
// playlist = await UserPlaylist.find({
//     playlistName: playlistName,
//     userID: userID
// }).populate("songsID")
// res.send(playlist[0])
// })



// הוספת שיר לפלייליסט קייםPUT
//הוספת שיר לפלייליסט חדשPOST 
//מחיקת שיר מפלייליסט קייםDELETE
//מחיקת פלייסט וכל השירים שלו DELETE




module.exports = router;