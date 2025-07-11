const express = require('express');
const router = express.Router();

const {userRegister , login , forgotPassword }=require("../controller/user.controller")

router.post("/register" , userRegister);

router.post("/login", login)

router.post("/password/forgot" , forgotPassword);

module.exports=router;