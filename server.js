const express=require("express");
const { connection } = require("./config/db");
const { autenthication } = require("./middlewares/authentication");
const { todoController } = require("./routes/todo.routes");
const PORT=8080;
const {userController}=require("./routes/user.routes")

const app=express();
app.use(express.json())

app.use("/user", userController);

app.use(autenthication)

app.use("/todos", todoController)


app.listen(PORT, async()=>{
    await connection
    console.log(`listining to port ${PORT}`)
})