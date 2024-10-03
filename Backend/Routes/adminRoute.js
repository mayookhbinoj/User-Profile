const express=require("express")
const adminRouter=express.Router()
const {getDeails,adminEditUser,adminUserDelete,createUser}=require("../controllers/adminController")
const {protection}=require("../Middleware/authMiddleWare")


adminRouter.get("/adminLoad",protection,getDeails)
adminRouter.put("/AdminEditUser",protection,adminEditUser)
adminRouter.delete("/AdminUseDelete/:userid",protection,adminUserDelete)
adminRouter.post("/AdminCreateUser",protection,createUser)

module.exports=adminRouter