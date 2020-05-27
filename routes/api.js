const express = require("express");
const router = express.Router();

const queen= require("../model/QOH");
const entry= require("../model/database");
const prince= require("../model/PrinceJohn");
const hook= require("../model/CaptainHook");

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
});

router.get("/prince", (req, res) =>{
    prince.find({})
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error);
    });
});

router.get("/hook", (req, res) =>{
    hook.find({})
    .then((data) =>{
        res.json(data);
    })
    .catch((error) =>{
        console.log(error);
    });
});

module.exports = router;