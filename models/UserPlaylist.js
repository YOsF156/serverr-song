const mongoose = require("mongoose");

const userPlaylistSchema = new mongoose.Schema(
    {
        userName: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        title: { type: String, required: true },
        songId: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song", require: true }]

    }
)

const UserPlaylist = mongoose.model("UserPlaylist", userPlaylistSchema);
module.exports = UserPlaylist;  
