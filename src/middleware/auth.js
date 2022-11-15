

const auth = async function (req, res, next) {

    try {
        const bearerHeader = req.header('Authorization', 'Basic Auth')

        if (!bearerHeader) {
            return res.status(400).send({ status: false, msg: "token is required" })
        }
        const bearer = bearerHeader.split(' ');
         const token = bearer[1];
        if(!token){
            return res.status(403).send({status:false,msg:"forbidden"})
        }else{
            next() 
        }
        
        

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }


}

module.exports = { auth }
