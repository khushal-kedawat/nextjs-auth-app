import{ connect }from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const{username , email , password} = reqBody
    
    console.log(reqBody);
    const user = await User.findOne({email})

    if(user){
      return NextResponse.json({error:"User already exits"},{status:500})
    }
    //hash the password
    const salt =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
      username,
      email,
      hashedPassword
    })
    
    const savedUser = await newUser.save()
    console.log(savedUser)

    // send verification email
    await sendEmail({email , emailType : "VERIFY" , 
      userId : savedUser._id
    })

    return NextResponse.json({
      message:"User created successfully",
      success:true,
      savedUser
    })


  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
  }

}