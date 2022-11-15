const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    deletedAt: {
        type: Date,
        default:null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},{timestamps:true})


module.exports=mongoose.model("User",userSchema)
