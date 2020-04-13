const User = require("../models/User")
const jwt = require("jsonwebtoken")

const auth = async(res, req, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer", "")
        const decoded = jwt.verify(token, "welcometothethunderdome")
        const user = await User.find({_id: decoded._id, 'tokens.token':token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({message: "Endpoint requires authentication"})
    }
}

module.exports(auth)