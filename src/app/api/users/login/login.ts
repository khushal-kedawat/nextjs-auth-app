import{ connect }from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request : NextRequest){
  try {
    const reqBody = await request.json()
    const{email,password} = reqBody
    console.log(reqBody)

    const user = await User.findOne({email})
    if(!user){
      NextResponse.json({error : "user does not exists"},{status:400})
    }
    const validPassword = await bcrypt.compare
    (password ,user.password)
    if(!validPassword){
      NextResponse.json({error : "Invalid Password"},{status : 400})
    }
    //create token data
    const tokenData = {
      id: user._id,
      username:user.username,
      email:user.email
    }
    const token =  jwt.sign(tokenData ,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    const response = NextResponse.json({
      message:"Login successful",
      success:true
    })
    response.cookies.set("token" , token ,{
      httpOnly:true

    })
    return response

  } catch (error : any) {
    return NextResponse.json({error:error.message},{status:500})
    
  }

}