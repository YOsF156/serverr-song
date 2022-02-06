const mongoose = require("mongoose");
const { Song } = require("./Song.js");
const { User } = require("./User.js")
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