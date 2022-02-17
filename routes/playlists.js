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
    const isSong = await UserPlaylist.findOne({ id: req.body.id });
    if (isSong) return res.status(500).json({ message: "the song is already in the main playlist" });
    let newSong = await new Song({ ...req.body, userID: `${req.user._id}` }).save();
    res.send(newSong);

})

router.post(`/addSongTo/:listName/:id`, async (req, res) => {//adding new playlist name
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
    playlist = await UserPlaylist.find({
        playlistName: playlistName,
        userID: userID
    }).populate("songsID")
    res.send(playlist[0])
});


router.delete(`/deleteSongFrom/:listName/:id`, async (req, res) => {//adding new playlist name
    const playlistName = req.params.listName;
    const songID = req.params.id;
    const userID = req.user._id
    let playlist = await UserPlaylist.findOne({ userID: userID, playlistName: playlistName }).populate("songsID");
    let songs = await playlist.songsID.map(song => { if (song.id !== songID) return song._id }).filter(id => id)
    playlist = await UserPlaylist.findOneAndUpdate({ userID: userID, playlistName: playlistName }, { songsID: songs }, {
        new: true,
    }).populate("songsID");
    res.send(playlist);
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