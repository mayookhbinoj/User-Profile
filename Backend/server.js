const  express=require("express")
const dotenv=require("dotenv").config()
const connect=require("./Config/db")
const path=require("path")
const cors=require("cors")

connect()
const app=express()
const Port=process.env.PORT||4000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use("/users",require("./Routes/userRoute"))
app.use("/admin",require("./Routes/adminRoute"))
app.listen(Port,()=>console.log("running in 4000"))