import React from 'react'
import { useState,useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import {login,reset} from "../features/auth/authSlice"

function Login() {
  const [formData,setData]=useState({
    email:"",
    password:"",
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user,isLoading,isSucess,isError,message}=useSelector((state)=>state.auth)
  console.log("userrr",user)
  const {email,password}=formData
  const onSubmit=(e)=>{
    e.preventDefault()
    if(!email || !password){
      toast.error("Email and Password required")
      return
    }
    const userData={
      email,
      password
    }
    dispatch(login(userData))
  }
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSucess||user){
      if(user.role=="admin"){
         navigate("/admin")
      }else{
        navigate("/")
      }
    
    }
    
  

  },[isSucess,isError,message,navigate,dispatch])
  const onChange=(e)=>{
    setData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))

  }
  return (
    <>
    <section className='heading'>
      <h1><FaSignInAlt/> Login</h1>
      <p>Please Login </p>
    </section>
    <section className='form'>
      <form
        onSubmit={onSubmit}>
        <div className="form-group">
          <input
           type="email"
            className='form-control' 
            value={email} id='email'
             name='email'
              placeholder='Enter your email'
               onChange={onChange} />
        </div>
        <div className="form-group">
          <input
           type="password"
            className='form-control' 
            value={password} id='password'
             name='password'
              placeholder='Enter your password'
               onChange={onChange} />
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'> submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login
