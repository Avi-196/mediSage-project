const express=require("express")

const router=express.Router()

const user_route=express()

const multer=require("multer")
const path=require('path')

user_route.use(express.static("public"))
   const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/userImage"),function(error,sucess){
            if(error) throw error
        })
    },
    filename:function(req,file,cb){
       const name= Date.now()+"_"+file.originalname
       cb(null,name,function(error1,sucess1){
        if(error1) throw error1
       })
    }

})
const upload=multer({storage:storage})

 const studentController=require("../Controller/studentController")
 const userController=require("../Controller/userController")
 const Authorization=require("../middleware/auth")

// router.get("/external",studentController.callExternalApiUsingHttp)

router.post("/student",Authorization.auth, studentController.createStudent)

router.get("/",studentController.getCountry)

router.post("/user",upload.single('image'),userController.createUser)

router.post("/userpaginate",userController.getUserWitPaginate)

router.put("/userUpdate/:userID",upload.single('image'),userController.updateUser)

router.delete("/userDelete/:userID",userController.deleteUser)

module.exports=router