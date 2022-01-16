const mongoose = require("mongoose");
const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        artist: { type: String, require: true },
        src: { type: String, require: true },
        createBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        provider: { type: String }
    }
)
const Song = mongoose.model("Song", songSchema);
module.exports = Song;
