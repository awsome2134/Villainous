const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Deck = new Schema({
    name: String,
    description: String,
    type1: String,
    type2: String,
    play: String,
    strength: Number,
    cost: Number
},{collection: 'maleficent'});

const database = mongoose.model("maleficent", Deck);
console.log("inside database");

module.exports = database;