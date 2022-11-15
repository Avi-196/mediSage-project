const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const route=require("./route/routes")
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://avinay:Avinay1996@cluster0.wj0k43r.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("mongodb connected")).catch(err=>console.log(err))

app.use('/',route)

app.listen(5000,function(){
    console.log("express is running on server"+" "+5000)
})