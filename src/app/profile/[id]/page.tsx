export default function UserProfile({params}: any){
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> profile </h1>
      <hr />
      <p className="text-4xl">Profile Page</p>
      <span className="p-2 rounded bg-white text-black">{params.id}</span>
    </div>
  )
}