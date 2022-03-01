const mongoose = require("mongoose");
const { Song } = require("./song.js");
const { User } = require("./user.js")
const { UserPlaylist } = require("./UserPlaylist.js")

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    return await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
const models = { Song, User, UserPlaylist }
module.exports = { connectDB, models } 