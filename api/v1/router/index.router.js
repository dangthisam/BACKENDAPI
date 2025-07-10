const express=require("express")
const router = express.Router();
const Task=require("../model/task.model")
require("dotenv").config();

const taskRouter=require("../router/task.router")
router.use("/api/v1/task",taskRouter)

module.exports=router;