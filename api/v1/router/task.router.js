const taskController=require("../controller/task.controller")
const {index}=require("../controller/task.controller")
const express = require('express');
const router = express.Router();

router.get("/task",index)

module.exports=router;