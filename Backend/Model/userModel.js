const mongoose= require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add  a name']
    },
    email:{
        type:String,
        required:[true,'please add  a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please add  a password']
    },image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    role: { type: String, default:"user" }
},
{timestamps:true}
)
module.exports=mongoose.model("User",userSchema)
