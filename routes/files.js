const express = require("express");
const path = require("path")
const multer = require("multer");
const File = require("../models/file");
const {v4: uuid4} = require("uuid")
const router = new express.Router()

//Setting format of storing  files on disk using multer module
const storage = multer.diskStorage({
    destination: "uploads",
    filename :(req,file,cb)=>{
        const uniquename= `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        cb(null,uniquename)
    } 
})

const upload = multer({
    storage,
    limit : {
        fileSize : 1000000*100
    }
})



//Post request for receiving files
router.post("/api/files",upload.single("myfile"),async(req,res)=>{
    // Validate the file 
    if(!req.file){
        return res.send({error : "All fields are required"})
    }
    // Store in database
    const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size
    })
    const response = await file.save()
    //Creating file download link 
    return res.send({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`}) 
})


router.post("/api/files/send",async(req,res)=>{
    const {uuid,emailTo,emailFrom} = req.body
    // Validate Request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({error:"All fields are required"})
    }
    // Get from database
    const file = await File.findOne({uuid:uuid})
    if(file.sender){
        return res.status(422).send({error:"Email already sent"})
    }

    file.sender = emailFrom
    file.receiver = emailTo
    const response = await file.save()

    //Send mail
    const sendMail = require("../services/emailServices")
    sendMail({
        from : emailFrom,
        to : emailTo,
        subject : "Quick File Sharing",
        text : `${emailFrom}`,
        html : require("../services/emailTemplate")({
            emailFrom,
            downloadLink : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000)+"KB",
            expires: "24 Hours"
        })
    
    })
    return res.send({success:true})
})

module.exports = router