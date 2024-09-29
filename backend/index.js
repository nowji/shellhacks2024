require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const jwtSecret = "shellhacks2024secret";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const MONGODB_URI="mongodb+srv://jamesphillips052404:vHtSe8HWhKJYQDdF@cluster0.lfl2k.mongodb.net/"

app.use(session({
    secret: "shellhacks2024",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI
    })
}))

// Connecting to DB
const connectDB = require('./server/config/db');
connectDB();
const User = require('./server/models/User');
const Data = require('./server/models/Data');

// Retrieve info
app.get("/info/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const data = await Data.findOne({ userId: id }).sort({ createdAt: -1 });
        return res.status(200).json({success: true, data});
    } catch(error){
        return res.status(500).json({success: error});
    }
})

// Handle info
app.post("/info", async (req, res) => {
    try{
        const { id, formData } = req.body;

        const data = await Data.create(formData);

        res.status(200).json({ success: true, data });
    } catch(error){
        console.log(error);
        return res.status(500).json({success: error});
    }
})

// Handle login
app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne( { email });
        if(!user){
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const decryptedPassword = await bcrypt.compare(password, user.password);

        if(!decryptedPassword){
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        return res.status(200).json({ success: true, user });
    } catch(error){
        return res.status(500).json({success: error});
    }
})

// Handle registering
app.post("/register", async (req, res) => {
    try{
        const { email, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailTaken = await User.findOne( { email }); // Check if email is taken

        if(emailTaken){
            console.log("Email already being used");
            return res.status(400).json({ success: false, message: "Email already taken" });
        }

        const user = await User.create({
            email: email,
            password: hashedPassword,
            firstname: firstName,
            lastname: lastName
        });

        res.status(200).json({ success: true, user });
    } catch(error){
        return res.status(500);
    }
})

app.listen(8000);