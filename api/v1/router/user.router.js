const express = require('express');
const router = express.Router();

const {userRegister , login  }=require("../controller/user.controller")

router.post("/register" , userRegister);

router.post("/login", login)

module.exports=router;