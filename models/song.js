const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        id: { type: String, require: true },
        views: { type: Number },
        duration: { type: String },
        uploadedAt: { type: String },
        thumbnails_url: { type: String },
        url: { type: String, require: true }
    }
)
const Song = mongoose.model("Song", songSchema);
module.exports = Song;
console.log(Song);