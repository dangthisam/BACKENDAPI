const express = require('express');
const router = express.Router();

const {userRegister , login , forgotPassword , otp }=require("../controller/user.controller")

router.post("/register" , userRegister);

router.post("/login", login)

router.post("/password/forgot" , forgotPassword);

router.post("/password/otp" , otp);

module.exports=router;