const { timestamp } = require("console")
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: { type: String, require: true },
        password: { type: String, require: true },
        // createBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
    },
    { timestamp: true }
)
const User = mongoose.model("User", userSchema);
module.exports = User;
