const express=require("express")
const router = express.Router();
const Task=require("../model/task.model")
require("dotenv").config();

const taskRouter=require("../router/task.router")
const userRouter=require("../router/user.router")

router.use("/api/v1/task",taskRouter)

router.use("/api/v1/user" , userRouter)

module.exports=router;