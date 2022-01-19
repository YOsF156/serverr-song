const express = require("express");
const router = express.Router();
// const axios = require("axios").default;
var axios = require("axios").default;

router.get("/search/:value", async (req, res) => {
    console.log(req.params.value);
    const value = req.params.value;
    var options = {
        method: "GET",
        url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
        params: { q: value },
        headers: {
            "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPID_API,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            const result = response.data.items.filter((item) => item.type == "video");
            res.send(result);
        })
        .catch(function (error) {
            console.error(error);
        });
});
module.exports = router;