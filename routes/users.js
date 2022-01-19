const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            res.json({ accessToken });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
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
    console.log("New user add successfuly")
    const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
    res.json({ accessToken });

})

router.get('/', async (req, res) => {
    console.log(req.body);
    let userList = await User.find({})
    res.send(userList);

})


// router.post('/mm', (req, res) => {

//     console.log("songs!!");
//     res.send('songs!');
// })

module.exports = router;