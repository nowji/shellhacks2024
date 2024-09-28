require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(cors());

// Connecting to DB
const connectDB = require('./server/config/db');
connectDB();
const User = require('./server/models/User');


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