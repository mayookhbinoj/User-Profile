import axios from "axios"
const API_URL="/admin"
const getAllUsers=async()=>{
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("token",token)
    const config={
        headers:{
            Authorization:`Bearer ${token}` 
        }
    }
  const response= await axios.get(API_URL+'/adminLoad',config)
  return response.data
   
}

const AdminEditUsers=async(userData)=>{
         const token = JSON.parse(localStorage.getItem("user"))?.token
         console.log("token",token)
         const response=await axios.put(API_URL+"/AdminEditUser",userData,{headers:{Authorization:`Bearer ${token}`}})
        //  if(response.data){
        //     localStorage.setItem("user",JSON.stringify(response.data))
        //   }
          console.log("responsedata",response)
          return response.data
    
}
const AdminDelteUser=async(userData)=>{
  const token = JSON.parse(localStorage.getItem("user"))?.token
  console.log("token",token)
  const response=await axios.delete(API_URL+`/AdminUseDelete/${userData}`,{headers:{Authorization:`Bearer ${token}`}})
  console.log("adminservice",response.data)
  return response.data
}

const adminCreateUser=async(userData)=>{
  console.log("enter in to adminaxios")
  const token = JSON.parse(localStorage.getItem("user"))?.token
  const response=await axios.post(API_URL+"/AdminCreateUser",userData,{headers:{Authorization:`Bearer ${token}`}})
  console.log(response.data)
  return response.data

}

const adminAuthService={getAllUsers,AdminEditUsers,AdminDelteUser,adminCreateUser}
export default adminAuthService