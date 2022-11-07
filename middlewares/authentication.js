const jwt=require("jsonwebtoken");
require("dotenv").config();
const autenthication = (req,res,next)=>{
    if(!req.headers.authorization){
        res.send("please login again")
    }
    const token=req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err){
            return res.send("Please login again")
        }else{
            console.log(decoded)
            req.body.userId=jwt.decode.userId
            next()
        }
      });

}

module.exports={
    autenthication
}