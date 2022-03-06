require("dotenv").config()
const mongoose = require("mongoose")

async function connectDB(){
    try{
        const connection = await mongoose.connect(process.env.MONGOOSE_CONNECTION_URL)
        console.log("Connected to database")
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDB