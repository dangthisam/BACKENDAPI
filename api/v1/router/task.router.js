const taskController=require("../controller/task.controller")
const {index  , detail  , changeStatus , changeMutilStatus  , create , edit , deletetask  , deleteManytask}=require("../controller/task.controller")
const express = require('express');
const router = express.Router();

router.get("/",index)
router.get("/detail/:id",detail)

router.patch("/change-status/:id", changeStatus)

router.patch("/change-mutil-status",changeMutilStatus)

router.post("/create",create)

router.patch("/edit/:id" , edit)

router.delete("/delete/:id" , deletetask);

router.delete("/delete-many-task", deleteManytask);
module.exports=router;