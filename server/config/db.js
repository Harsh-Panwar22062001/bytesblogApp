const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`error connection DB ${error}`.bgRed)
    }
}

module.exports = connectDB;