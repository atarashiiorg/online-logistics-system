const nodemailer = require('nodemailer')

const sendMail = async(mail,subject,htmlTemplate) => {
    return new Promise((resolve, reject) => {
        
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_MAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
        
        const mailOptions = {
            from: process.env.MAILER_MAIL,
            to: mail,
            subject:subject,
            text: "",
            html:htmlTemplate
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                // console.log(info)
                resolve(info)
            }
        });
    })
}

module.exports = sendMail