const studentModel=require("../Model/studentModel")

const axios=require("axios")
const isValid=function(value){
    if(typeof value==="undefined"||typeof value===null) return false
    if(typeof value==="string"&& value.trim().length===0) return false
    return true
}

//name, phone_number, email, country, coutry_code
const createStudent=async function(req,res){
    try {
        let data=req.body
        let {name,phone_number,email,country,country_code}=data
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
        if(!isValid(country)){
            return res.status(400).send({status:false,msg:"country is required"})
        }
        if(!isValid(country_code)){
            return res.status(400).send({status:false,msg:"country code is required"})
        }
         let emailAlreadyPresent=await studentModel.findOne({email})
         if(emailAlreadyPresent){
            return res.status(400).send({status:false,msg:"this email is already is present"})
         }
         let phoneNumberAlreadyPresent=await studentModel.findOne({phone_number})
         if(phoneNumberAlreadyPresent){
            return res.status(400).send({status:false,msg:"this phoneNumber is already present"})
         }
          const studentData={
             name,phone_number,email,country,country_code
          }
        
          const students=await studentModel.create(studentData)
          return res.status(201).send({status:true,msg:"created sucessfully",data:students})
          
          
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createStudent=createStudent


// https://restcountries.eu/rest/v2/callingcode/91
// const https = require('https');
 
// //_EXTERNAL_URL = 'https://restcountries.eu/rest/v2/callingcode/91';


// //const callExternalApiUsingHttp = (callback) => {
//     https.get("https://restcountries.eu/rest/v2/callingcode/91?access_key=a3340b277f2e66e731ef0c6b8d43571", (resp) => {
//     let data = '';
    
//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });
    
//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//        // return callback(data);
//        console.log(data)
//         //console.log(JSON.stringify(data));
//     });
    
//     }).on("error", (err) => {
       
//     console.log("Error: " + err.message);
//     });
// //}

// module.exports.callExternalApiUsingHttp = callExternalApiUsingHttp;


let getCountry = async function (req, res) {

    try {
        let callingcode=req.params.callingcode
        let API_KEY=req.query.access_key
        let options = {
            method: 'get',
            url: `https://api.countrylayer.com/v2/callingcode/${callingcode}?access_key=${API_KEY} `
        }
        let result = await axios(options);
        console.log(result.data)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getCountry=getCountry

