import axios from "axios"


const API_URL='/users'

const register=async(userData)=>{
    const response=await axios.post(API_URL,userData)
    if(response.data){
      localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const login=async(userData)=>{
    const response=await axios.post(API_URL+"/login",userData)
    if(response.data){
      localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const editUser=async(userData)=>{
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  console.log("token",token)
  const response=await axios.put(API_URL+"/editUser",userData,{headers:{Authorization:`Bearer ${token}`, 'Content-Type': 'multipart/form-data'}})
  if(response.data){
    localStorage.setItem("user",JSON.stringify(response.data))
  }
  console.log(response.data)
  return response.data
}


const logOut=()=>{
  console.log("eneter into logout")
  localStorage.removeItem('user')
}
const authService={register,logOut,login,editUser}
export default authService