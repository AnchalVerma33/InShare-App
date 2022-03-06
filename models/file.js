const { default: mongoose } = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    sender:{
        type:String,
        required: false
    },
    receiver:{
        type:String,
        required:false
    },
    data:{
        type:Buffer
    }

},{timestamps:true})

const File = mongoose.model("File",fileSchema)

module.exports = File