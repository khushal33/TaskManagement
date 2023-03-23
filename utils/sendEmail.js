const nodemailer = require('nodemailer');
const {emailHost,emailFrom,emailPortsecure,emailPort,pass} = require('../config').config[env]
module.exports = {
    sendEmailNotification : async( htmlToSend , reciepant ,subject)=>{
        try{
            let   from =  {
                name: '@noReply',
                address: emailFrom
            }
            let mailOptions = {
                    from: from,
                    to: reciepant,
                    subject,
                    html: htmlToSend
                };
            let transporter = nodemailer.createTransport({
                host: emailHost,
                port: emailPort,
                secure:emailPortsecure, 
                auth : {
                    user : emailFrom,
                    pass :pass
                },
            });
           let emailSent =  await transporter.sendMail(mailOptions);
            console.log("email sent",emailSent)
        }catch(ex){
            console.log(`ex ${ex}`);
        }
    }
}