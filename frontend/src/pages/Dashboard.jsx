import React, { useEffect, useState,useRef} from 'react'
import "./Dashboard.css"
import {reset,editUser} from "../features/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Dashboard() {
  const {user,isSucess,isError,message}=useSelector((state)=>state.auth)
  console.log("user",user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formRef = useRef()
 
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [newData,setData]=useState({name:user?.name ||"",email:user?.email||""})
   const [imagePreview, setImagePreview] = useState(user?.image || "")
   const [newImage,setImage]=useState()
   const {name,email,}=newData

  
   const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSave = () => {
    setIsModalOpen(false);
    dispatch(editUser(newData))
  };
  const onChange=(e)=>{
    console.log("e",e)
    setData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
    console.log(newData)
  }
  const onInputImage=(e)=>{
    const file=e.target.files[0]
    if(file){
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
     
    }
 
    }
  
 const submitImage=(e)=>{
   e.preventDefault()
   const formData=new FormData()
   
   formData.append("image",newImage)
   formData.append("name",name)
   formData.append("email",email)
   
   dispatch(editUser(formData))

 }
  useEffect(()=>{
    if(isSucess){
      console.log("nvaaaaa")
      navigate("/")
    }

  },[isSucess])
  return (
    <div>
      {user ? (
          <div className='hero'>
            <div className="card">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <form ref={formRef} onSubmit={submitImage}>
              <label htmlFor="images" > <img src={imagePreview} alt=""/></label>
              <input type="file" id='images' accept='image/*' name='image' onChange={onInputImage} hidden ></input> 
              <div className="button-container">
               <button type='submit' className='btndash'>edit Image</button>
               <button type='button' className='btndash' onClick={handleEditClick}>edit</button>
               </div>
             </form>
             
            </div>
          </div>
        ):(<> <h1>hello dashboard</h1></>)}
          {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Edit User Information</h2>
            <label>
              Name:
              <input
                type='text'
                value={name}
                name='name'
                onChange={onChange}
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                 value={email}
                name='email'
                onChange={onChange}
              />
            </label>
            <input type="text" hidden  value={user._id} name='userId'/>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
     
    </div>
  )
}

export default Dashboard
