const mongoose = require("mongoose");

const userPlaylistSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        userName: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        songs_id: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song", require: true }]

    }
)

const UserPlaylist = mongoose.model("UserPlaylist", userPlaylistSchema);
module.exports = UserPlaylist;  
