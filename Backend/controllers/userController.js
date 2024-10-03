const jwt=require("jsonwebtoken")
const bycrypt= require("bcrypt")
const asyncHandler=require("express-async-handler")
const user=require("../Model/userModel")

const registeruser=asyncHandler(async(req,res)=>{
    console.log("enter in to register")
    const {name,email,password}=req.body
    const userExist=await user.findOne({email})
    if(userExist){
      res.status(400)
      throw new Error("user exists")
    }
    const salt=await bycrypt.genSalt(10)
    const hashedPassword=await bycrypt.hash(password,salt)

    const User=await user.create({
        name,
        email,
        password:hashedPassword,
        
    })
    console.log("user",User)
    if(User){
        res.status(201).json({
            _id:User.id,
            name:User.name,
            email:User.email,
            image:User.image,
            token:generateToken(User.id)

        })
    }else{
        res.status(400)
        throw new Error("invalid Data")
    } 
})
const loginUser=asyncHandler(async(req,res)=>{
    console.log("eneter in  to login")
    const{email,password}=req.body
    console.log("rewwwww",req.user)
    const User=await user.findOne({email})
    console.log(User)
    if(User &&(await bycrypt.compare(password,User.password))){
        res.json({
            _id:User.id,
            name:User.name,
            email:User.email,
            image:User.image,
            role:User.role,
            token:generateToken(User._id)
            
        })
    }else{
        res.status(400)
        throw new Error("invalid credential")
    }
})    

const editUser=asyncHandler(async(req,res)=>{
    console.log("enter into edit")
    console.log(req.user)
    const {name,email}=req.body
    console.log("hello",req.body,req.file)
    const updateparameter={name:name,email:email}
    if(req.file){
    updateparameter.image=`http://localhost:4000/uploads/${req.file.filename}`
    }
    const User=await user.findByIdAndUpdate(req.user.id,updateparameter,{new:true})
    console.log("useretta",User)
    if(User){
        const responseData = {
            _id: req.user.id,
            name: User.name,
            email: User.email,
            token: req.token,
        };
        if(req.file){
            responseData.image=User.image
        }
        res.status(200).json(responseData)
    } else{
        res.status(404)
        throw new Error("user not found")
    }
})

const generateToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}
module.exports={
    registeruser,
    loginUser,
    editUser

}