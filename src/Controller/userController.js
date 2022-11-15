const userModel=require("../Model/userModel")

const isValid=function(value){
    if(typeof value==="undefined"||typeof value===null) return false
    if(typeof value==="string"&& value.trim().length===0) return false
    return true
}

const createUser=async function(req,res){
    try {
        let data=req.body
        
 let {name,phone_number,email,password} =data
       if(!isValid(name)){
          return res.status(400).send({status:false,msg:"name is required"})
       }
       if(!isValid(phone_number)){
        return res.status(400).send({status:false,msg:"phone_number is required"})
    }
    if (!(/^\d{10}$/.test(phone_number))) {
        return res.status(400).send({ status: false, msg: "invalid Phone_number, it should be of 10 digits" })
        
    }
    if(!isValid(email)){
        return res.status(400).send({status:false,msg:"email is required"})
    }
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
        return res.status(400).send({ status: false, msg: "invalid email" })
        
    }
    if(!isValid(password)){
        return res.status(400).send({status:false,msg:"password is required"})
    }
    let emailAlreadyPresent=await userModel.findOne({email})
    if(emailAlreadyPresent){
       return res.status(400).send({status:false,msg:"this email is already is present"})
    }
    let phoneNumberAlreadyPresent=await userModel.findOne({phone_number})
    if(phoneNumberAlreadyPresent){
       return res.status(400).send({status:false,msg:"this phoneNumber is already present"})
    }
    
       let userData={
           name:name,
           phone_number:phone_number,
           email:email,
           password:password,
           image:req.file.filename
       }
       const user=await userModel.create(userData)
       return res.status(201).send({status:true,msg:" congrats!user created sucessfull",data:user})
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}


const updateUser=async function(req,res){
    try {
       let data=req.body
       let userID=req.params.userID
      
       var obj
       if(req.file!==undefined){
             obj={
               name:data.name,
               phone_number:data.phone_number,
              email:data.email,
              password:data.password,
             image:req.file.filename
             }
       }else{
           obj={
            name:data.name,
            phone_number:data.phone_number,
           email:data.email,
           password:data.password
           }
       }
      
       let userUpdate=await userModel.findByIdAndUpdate({_id:userID},{$set:obj},{new:true})
       return res.status(200).send({msg:" user!updated sucessfull",data:userUpdate})
    } catch (error) {
       return res.status(500).send({status:false,msg:error.message})
    }
}


const deleteUser=async function(req,res){
    try {
        
        let userID=req.params.userID
        const user=await userModel.findById({_id:userID})
        if(!user){
            return res.status(404).send({status:false,msg:"user data not found"})
        }
        if(user.isDeleted===true){
            return res.status(400).send({status:false,msg:"already deleted"})
        } 
       
        const userDetails=await userModel.findByIdAndUpdate({_id:userID},{$set:{isDeleted:true,deletedAt:new Date()}},{new:true})
        return res.status(200).send({status:true,msg:"deleted",data:userDetails})  
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

const getUserWitPaginate=async function(req,res){
    try {
         var page=req.query.page
         var sort=req.query.sort
         if(page<=1){
            skip=0
         }else{
            skip=(page-1)*2
         }
         if(sort=="name"){
            var user= await userModel.find().sort({name:1}).skip(skip).limit(2)
         }else{
          var user= await userModel.find().skip(skip).limit(2)
         }
         res.status(200).send({status:true,msg:"user details",data:user})
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createUser=createUser
module.exports.updateUser=updateUser
module.exports.deleteUser=deleteUser
module.exports.getUserWitPaginate=getUserWitPaginate