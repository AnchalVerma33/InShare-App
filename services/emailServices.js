const nodemailer = require("nodemailer")

function sendMail({from,to,subject,text,html}){
    const transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
    })

    let info = transporter.sendMail({
        from: `InShare<${from}>`,
        to,
        subject,
        text,
        html
    })
}

module.exports = sendMail