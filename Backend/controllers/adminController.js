
const user=require("../Model/userModel")
const asyncHandler=require("express-async-handler")
const bycrypt=require("bcrypt")


const getDeails=asyncHandler(async(req,res)=>{
    try {
      console.log("enetr in tolog")
        const User=await user.find({role:"user"})
        console.log(User)
        if (User.length > 0) {
           
            res.status(200).json(User);
          } else {
            res.status(404).json({ message: "No users found" });
          }
    } catch (error) {
        res.status(404)
        throw new Error("users not found");
        
    }
})

const  adminEditUser=asyncHandler(async(req,res)=>{
  try {
    console.log("enter in to admin edit user")
    console.log(req.body)
    const userId=req.body._id
    const updateparameter={
      name:req.body.name,
      email:req.body.email
    }
    const User=await user.findByIdAndUpdate(userId,updateparameter,{new:true})
    console.log("userettan",User)
    if(User){

      res.status(200).json(User)
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({message:"failed"})
  }
})

const createUser=asyncHandler(async(req,res)=>{
  try {
    console.log("enter in  to the create user")
    console.log(req.body)
    const {name,email,password}=req.body
    const salt=await bycrypt.genSalt(10)
    const hashedPassword=await bycrypt.hash(password,salt)
    const newUser=await user.create({
      name:name,
      email:email,
      password:hashedPassword
    })
    console.log("new user",newUser)
    if(newUser){
      console.log("enter in to new user")
      res.status(200).json(newUser)
    }else{
      console.log("error")
    }
  } catch (error) {
    console.log(error)
    
  }
})


const adminUserDelete=asyncHandler(async(req,res)=>{
  try {
    console.log("enter in to delete")
    const userid=req.params.userid
    console.log(userid)
    const UserDelete=await user.findByIdAndDelete(userid)
    if(UserDelete){
      res.status(200).json(UserDelete)
    }
  
  } catch (error) {
    console.log(error)
  }
})

module.exports={getDeails,adminEditUser,adminUserDelete,createUser}


