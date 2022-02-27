const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const UserPlaylist = require("../models/UserPlaylist")
const jwt = require("jsonwebtoken");


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log(user);
        if (!user) return res.status(400).json({ message: "you need register before login" });
        const match = await bcrypt.compare(req.body.password, user.password);
        const userId = { _id: user._id }
        if (match) {
            // const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);//בעבר השתשמשנו עם הצפנה של כל הסכמה המונגואית
            const accessToken = jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '20m' });
            console.log(accessToken);
            res.json({ accessToken });
        } else {
            res.status(400).json({ message: "one or more details is incorrect" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
});


router.post('/register', async (req, res) => {
    const isUser = await User.findOne({ username: req.body.username });
    if (isUser) return res.status(500).json({ message: "the username is token" });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    const saveUser = await user.save();
    console.log("User successfully added")
    mainPlaylist = await new UserPlaylist({
        playlistName: "main playlist",
        userID: saveUser._id
    }).save();
    //הוספת פלייליסט ראשי
    const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
    res.json({ accessToken });

})

router.get('/', async (req, res) => {
    console.log(req.body);
    let userList = await User.find({})
    res.send(userList);

})


module.exports = router;