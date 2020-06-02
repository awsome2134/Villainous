const path = require("path"); 

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

//set up database connections
const mongoose = require("mongoose");
mongodb_URI = "mongodb+srv://my922299:Awsome2134@pokemonlist-cjrhm.mongodb.net/Decks";
mongoose.connect(process.env.MONGODB_URI || mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>{
    console.log("Mongoose Connected");
});

const routes = require("./routes/api");

const morgan = require("morgan");
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.use("/api", routes);
app.listen(port, console.log(`Server is running on ${port}`));