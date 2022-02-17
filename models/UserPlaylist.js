const mongoose = require("mongoose");

const userPlaylistSchema = new mongoose.Schema(
    {
        playlistName: { type: String, required: true },
        userID: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        songsID: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song" }]

    }
)

const UserPlaylist = mongoose.model("UserPlaylist", userPlaylistSchema);
module.exports = UserPlaylist;  
