require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");

const { connectDB } = require("./models/index");
const { songsRoute, userRoute } = require("./routes/router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

connectDB().then(() => {
    console.log("connect to t=he DB success")
})


app.use("/songs", songsRoute);
app.use("/user", userRoute)
// app.get()
