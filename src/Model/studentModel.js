const mongoose=require('mongoose')
//id, name, phone_number, email, country, coutry_code
const studentSchema=new mongoose.Schema({
         name:{
            type:String,
            required:true,
            trim:true
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
        country:{
            type:String,
            required:true
        },
        country_code:{
            type:String,
            required:true
        }
},{timestamps:true})

module.exports=mongoose.model("Student",studentSchema)