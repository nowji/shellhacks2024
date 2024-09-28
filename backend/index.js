require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Connecting to DB
const connectDB = require('./server/config/db');
connectDB();
const User = require('./server/models/User');

app.post("/register", async (req, res) => {
    try{
        const { email, password, firstName, lastName } = req.body;

        const emailTaken = await User.findOne( { email }); // Check if email is taken

        if(emailTaken){
            console.log("Email already being used");
            return res.status(400).json({ success: false, message: "Email already taken" });
        }

        const user = await User.create({
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName
        });

        res.status(200).json({ success: true, user });
    } catch(error){
        res.send(error);
    }
})

app.listen(8000);