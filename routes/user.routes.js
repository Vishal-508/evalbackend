const {Router}=require("express");
const bcrypt = require("bcrypt")
const internalIp = require('internal-ipaddress');
const {UserModel}=require("../models/User.model")
const jwt= require("jsonwebtoken")
require("dotenv").config();
const userController= Router();

userController.post("/signup", (req,res)=>{
    const {email,password}= req.body;
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            return res.send("sign up failed")
        }
        const IP= async()=> { await internalIp.v4;}
        const user = new UserModel({email, password:hash,userIP:IP})
        try{

            await user.save()
            return res.send("sign up successfull")
        }catch(err){
            console.log(err)
            res.send("something went wrong")
        }
    });
})

userController.post("/login", async(req,res)=>{
    const {email,password}= req.body;
    const user=await UserModel.findOne({email});
    const hash=user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("something went wrong")
        }
        if(result){
            const token =jwt.sign({ userId:user._id }, process.env.JWT_SECRET);
            res.send({msg:"login successfull",token})
        }else{
            res.send("Invailed credentials")
        }
    });
})

module.exports={userController}