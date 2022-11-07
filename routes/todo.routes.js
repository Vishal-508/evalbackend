const {Router}=require("express");
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const {TodoModel}=require("../models/Todo.model")
require("dotenv").config();
const todoController= Router();

todoController.get("/", async(req,res)=>{
    const todos= await TodoModel.find({});
    res.send(todos);
    
})

todoController.post("/create",async(req,res)=>{

const {taskname,status,tag,userId}=req.body;

const new_todo=new TodoModel({
 taskname,
 status,
 tag,
 userId
})
try{

    await new_todo.save();
    res.send({msg:"todo successfully created", new_todo})
}catch(err){
    res.send("something went wrong")
}
})

todoController.patch("/delete/:todoId", async(req,res)=>{
    const {todoId}=req.params;
    const deleteTodo= await TodoModel.findOneAndDelete({_id:todoId,userId:req.body.userId})
    if(deleteTodo){
        res.send("Deleted")
    }else{
        res.send("coudn't delete")
    }
   
})

todoController.patch("/edit/:todoId", async(req,res)=>{
    const {todoId}=req.params
    const updateTodo= await TodoModel.findOneAndUpdate({_id:todoId,userId:req.body.userId}, {...req.body})
    if(updateTodo){
        res.send("Update")
    }else{
        res.send("coudn't update")
    }
})




module.exports={todoController}