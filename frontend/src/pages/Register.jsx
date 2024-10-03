  import React from 'react'
  import { useState,useEffect } from 'react'
  import { FaUser } from 'react-icons/fa'
  import {useSelector,useDispatch} from "react-redux"
  import {useNavigate} from "react-router-dom"
  import { toast } from 'react-toastify'
  import {register,reset} from "../features/auth/authSlice"
  function Register() {
    const [formData,setData]=useState({
      name:"",
      email:"",
      password:"",
      password2:""
    })
    const {name,email,password,password2}=formData
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user,isLoading,isSucess,isError,message}=useSelector((state)=>state.auth)

    const onSubmit=(e)=>{
      e.preventDefault()
      if (!name || !email || !password || !password2) {
        toast.error("Please fill out all fields")
        return
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(email)) {
        toast.error("Please enter a valid email address")
        return
      }
  
      if(password!==password2){
        toast.error("Password donot match")
      }else{
        const  userData={
          name,
          email,
          password
        }
        dispatch(register(userData))
      }
    }
    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSucess||user){
        navigate("/")
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
        <h1><FaUser/> Register</h1>
        <p>Please Create account</p>
      </section>
      <section className='form'>
        <form  onSubmit={onSubmit}>
          <div className="form-group">
            <input
            type="text"
              className='form-control' 
              value={name} id='name'
              name='name'
                placeholder='Enter your name'
                onChange={onChange} />
          </div>
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
            <input
            type="password"
              className='form-control' 
              value={password2} id='password2'
              name='password2'
                placeholder='confirm password'
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

  export default Register
