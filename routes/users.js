const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")


router.post('/login', async (req, res) => {
    console.log(req.body);
    const user = await new User.findOne({ username: req.body.username });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
        res.json({ accessToken })

    } else {
        res.status(400).json({ massage: "invalid cradentails" })
    }

})

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    const saveUser = await user.save();
    console.log("New user add successfuly")
    res.json(saveUser);

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