import React, { useEffect, useState } from 'react'
import "./Admin.css"
import {getAllUser,editUser,deleteuser,createAdminUser} from "../features/auth/adminAuth/adminauth.slice"
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminDashBoar() {
  const [newData,setData]=useState(null)
  const [formData,setFormData]=useState({name:"",email:"",password:""})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const {name,email,password}=formData
  const dispatch=useDispatch()
  const naviage=useNavigate()
  const {users,isSucess}=useSelector((state)=>state.adminAuth)
  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

   useEffect(()=>{
     dispatch(getAllUser())   
   },[])
   const handleDelete=(userid)=>{
    console.log("clicked")
    dispatch(deleteuser(userid))
   }
   const handleEditClick = (usersId) => {
    const user = users.find((user) => user._id === usersId)
    console.log("userid",user)
    setData(user)
    setIsModalOpen(true);
 
  };
  const onchange=(e)=>{
    console.log(e)
    if(isModalOpen){
      setData((prevState)=>({
        ...prevState,[e.target.name]:e.target.value
      }))
    }
    
  }

  const onchangeUse=(e)=>{
    console.log(e.target.value)
    setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))

  }
  const onsubmit=(e)=>{
    e.preventDefault()
    
    const userData={name,email,password }
    console.log(userData)
    dispatch(createAdminUser(userData))
    
    setFormData({ name: "", email: "", password: "" })
 

  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  };
  const handleSave = () => {
    setIsModalOpen(false)
    if(newData){
      dispatch(editUser(newData)) 
    }else{
      dispatch(editUser(searchTerm))
    }
   

  };
  return (
    <div className="admin-dashboard">
      <h1>Welcome Admin</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search user by name..."
         onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="user-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <div className="button-container">
                <button type='submit' className='btndash' onClick={() => handleEditClick(user._id)}>edit </button>
                <button type='button' className='btndash' onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </tr>
          ))}
  </tbody>
</table>

<form className="add-user-form" onSubmit={onsubmit}>
  <h2>Create New User</h2>
  <input
    type="text"
    placeholder="Name" 
    name="name"
    value={name} 
    onChange={onchangeUse}   
  />
  <input
    type="email"
    placeholder="Email"
    name="email"
    value={email}
    onChange={onchangeUse}  
  />
  <input
    type="password"
    placeholder="password"
    name="password"
    value={password}
    onChange={onchangeUse} 
  />
  <button type="submit">Add User</button>
</form>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Edit User Information</h2>
            <label>
              Name:
              <input
                type='text'
                value={newData.name}
                name='name'
                onChange={onchange}
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                value={newData.email}
                name='email'
                onChange={onchange}
             
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminDashBoar

