"use Client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function ProfilePage(){
  const router = useRouter()
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
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> profile page</h1>
      <hr />
      <p> Profile Page</p>
      <hr />
      <button 
      onClick={logout}
      className="bg-blue-500 hover:bg-blue-700 text-white
      px-4 py-2 mt-4 font-bold">
        Logout
      </button>
    </div>
  )
}