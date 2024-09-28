const mongoose = require('mongoose');
const MONGODB_URI="mongodb+srv://jamesphillips052404:vHtSe8HWhKJYQDdF@cluster0.lfl2k.mongodb.net/"

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch(error){
        console.log(error);
    }
}

module.exports = connectDB;