const mongoose = require("mongoose");

const Schema= mongoose.Schema;
const Deck= new Schema({
    name: String,
    description: String,
    type1: String,
    type2: String,
    play: String,
    cost: Number,
    strength: Number
},{collection: 'prince john'});

const database= mongoose.model("prince john", Deck);

module.exports= database;