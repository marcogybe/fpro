import sendGrid from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()


export const emailSender = async ( email, subject, plainText, htmlText) =>{

const API_KEY = process.env.SEND_GRID_API_KEY

sendGrid.setApiKey(API_KEY)

try{
    const message = {
        to: email,
        from:{
            name: 'Gift4U Shop',
            email: 'wmossleh@uos.de'
        },
        subject: subject,
        text: plainText,
        html: htmlText
    }
    const result = await sendGrid.send(message)
    console.log(result[0].statusCode)
    if(result[0].statusCode === 202) return true
}
catch(err){
    console.log("error occurred while sending email");
    return false
}
}
