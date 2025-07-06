"use Client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React from "react"



export default function ProfilePage(){
  const router = useRouter()
  const [data ,setData] = React.useState("nothing")
  const logout =  async () =>{
    try {
      await axios.get("api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error : any) {
      console.log(error.message)
      toast.error(error.message)
      
    }

  }
  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)

  }


  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> profile page</h1>
      <hr />
      <p> Profile Page</p>
      <h2>{data === 'nothing' ? "Nothing" :<Link href={`/profile/${data}`}>
       {data}   </Link> }

      </h2>
      <hr />
      <button 
      onClick={logout}
      className="bg-blue-500 hover:bg-blue-700 text-white
      px-4 py-2 mt-4 font-bold">
        Logout
      </button>
      <hr />
       <button 
      onClick={getUserDetails}
      className="bg-green-500 hover:bg-blue-700 text-white
      px-4 py-2 mt-4 font-bold">
        getUserDetails
      </button>

    </div>
  )
}