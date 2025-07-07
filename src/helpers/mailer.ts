import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"


export const sendEmail = async ({email , emailType , userId} : any) =>{
  try {
    const hashedToken = await bcrypt.hash(userId.toString() , 10)

   if(emailType === "VERIFY"){
     await User.findByIdAndUpdate(userId,{
      verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 3600000
    })
   }
   else if(emailType === "RESET"){
     await User.findByIdAndUpdate(userId,{
      forgotPasswordToken : hashedToken , forgetPasswordTokenExpiry : Date.now() + 3600000
    })
  }

  const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "144970da9dc18d",
    pass: "****9b1c"
  }
  })
  const mailoptions = {
    from : 'khushal@gmail.com',
    to : email,
    subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html : `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token${hashedToken}">here</a>
    to${emailType === "VERIFY" ? "verify your email" : "reset your password"}`
  }

  const mailResponse = await transporter.sendMail(mailoptions)
  return mailResponse

    
  } catch (error : any) {
      throw new Error(error.message)
    
  }

}