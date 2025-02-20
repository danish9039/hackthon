const jwt = require("jsonwebtoken");
const User = require("../models/auth");



const isauthenticated = async(req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({message: 'Please login to access this resource'});
        }
        console.log(token)
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded._id);
        console.log(req.user);
        next();
    }catch(error){
        return next(error);
    }
}
module.exports = {isauthenticated}