const mongoose = require("mongoose");
const { Song } = require("./song");
const { User } = require("./user")
const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    return await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
const models = { Song, User }
module.exports = { connectDB, models }