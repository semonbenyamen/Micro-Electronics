const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoDB')
.then(() => console.log("connected to mongoDB"))
.catch(err => console.error("could not connect", err));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
});
