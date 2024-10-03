const express=require("express")
const router=express.Router()
const multer=require("multer")
const path = require('path')

//added comment

const {registeruser,loginUser,editUser}= require("../controllers/userController")
const {protection}=require("../Middleware/authMiddleWare")
console.log(__dirname,"heeyy")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath=path.join(__dirname,'../uploads')
        console.log("Saving to uploads folder")
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/",registeruser)
router.post("/login",loginUser)
router.put("/editUser",protection,upload.single("image"),editUser)

module.exports=router