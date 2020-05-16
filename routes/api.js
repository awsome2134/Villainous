const express = require("express");
const router = express.Router();

const queen= require("../model/QOH");
const entry= require("../model/database");

router.get("/QOH", (req, res) =>{
    queen.find({})
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error);
    });
});

router.get("/maleficent", (req, res) =>{
    entry.find({})
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error);
    });
})

module.exports = router;