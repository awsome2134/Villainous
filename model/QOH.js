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
});

const database = mongoose.model("queen of hearts", Deck);

module.exports = database;