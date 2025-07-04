"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";


export default function SingupPage(){
  const router = useRouter();
  const[user,setUser] = React.useState({
    email:"",
    password:"",
    username:""
  })

const [buttonDisabled ,setButtonDisabled] = React.useState(false)
const[loading , setLoading] = React.useState(false)

useEffect( () => {
  if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
    setButtonDisabled(false)
  }
  else{
    setButtonDisabled(true)
  }

},[user])


const onSignUp =  async () =>{
  try {
    setLoading(true)
    const response = await axios.put("/api/users/signup")
    console.log("SignUp success" , response.data)
    router.push("/login")
    
  } catch (error : any) {
    console.log("Signup failed ",error)
    toast.error(error.message)
    
  }finally{
    setLoading(false)
  }

}
  return(
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" :"SignUp" }</h1>
    <hr />
    <label htmlFor="username">username</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg
    mb-4 focus:outline-none focus:border-gray-600 text-black"
      id='username'
      type="text"
      value={user.password}
      onChange={(e) => setUser({...user ,username:
      e.target.value})}
      placeholder="username"
     />
     <label htmlFor="email">email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg
    mb-4 focus:outline-none focus:border-gray-600 text-black"
      id='email'
      type="text"
      value={user.email}
      onChange={(e) => setUser({...user ,email:
      e.target.value})}
      placeholder="email"
     />
     <label htmlFor="password">password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg
    mb-4 focus:outline-none focus:border-gray-600 text-black"
      id='password'
      type="password"
      value={user.password}
      onChange={(e) => setUser({...user ,password:
      e.target.value})}
      placeholder="password"
     />
     <button onClick={onSignUp}
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-600">
      {buttonDisabled ? "No SignUp" : "SignUp"}
     </button>
    <Link href="/login"> Visit Login Page</Link>
   </div>
  )

} 