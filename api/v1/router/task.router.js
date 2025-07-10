const taskController=require("../controller/task.controller")
const {index  , detail}=require("../controller/task.controller")
const express = require('express');
const router = express.Router();

router.get("/task",index)
router.get("/task/detail/:id",detail)

module.exports=router;