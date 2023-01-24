require("dotenv").config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const connectDatabase = async function(app){
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, ()=>{
            console.log("Database Connected");
           
        });
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {connectDatabase};