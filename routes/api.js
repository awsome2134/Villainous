const express = require("express");
const router = express.Router();

const entry = require("../model/database");

router.get("/QOH", (req, res) =>{
    entry.find({})
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error);
    });
});

module.exports = router;