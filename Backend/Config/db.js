const mongoose=require("mongoose")


const connectdb=async()=>{
    try {
        const con=await mongoose.connect("mongodb://localhost:27017/Myapp",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log("errorr in mongodb",error)
    }
}

module.exports=connectdb