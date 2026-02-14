require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const User = require("./User");

const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const mongo_url = process.env.DB_URL;
async function dbconnection() {
    try {
        await mongoose.connect(mongo_url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
dbconnection();





app.post("/register", async(req, res) => {
    try {
        const {username, email, password, role} = req.body;
        if (!username || !email || !password) return res.status(400).json({msg: "Missing Data"});
        
        const existUser = await User.findOne({email});


        if(existUser) return res.status(400).json({msg: "Account Already Exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            role
        });
        res.status(201).json({
            msg: "Done Created User",
            data: user,
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {return res.status(400).json({ msg: "Missing Data" });
    }
    const user =await User.findOne({ email });
    if (!user){
            return res.status(400).json ({ msg: "Account Not Found Please Create Account" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword)
            return res.status(400).json({ msg: "Invalid password" }); 

        res.status(200).json({
            msg: "Success Login",
            data: authCode,
        });

const authCode = Buffer.from(user._id.toString()).toString("base64");

    } catch (error) {
        console.log(error);
    }
});



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running");
});
