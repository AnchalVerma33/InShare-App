const express = require("express")
const path = require("path")
const connectDB = require("./config/db")
const router = require("./routes/files")
const router1 = require("./routes/show")
const router2 = require("./routes/download")
const ejs = require("ejs")



// Connection to database
connectDB()

const app = express()

//Tempplate engine 
app.use(express.static("public"))
app.use(express.json())
app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs")

//setting express server and routes

app.use(router)
app.use(router1)
app.use(router2)




// defining port
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})