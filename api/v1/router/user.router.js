const express = require('express');
const router = express.Router();

const {userRegister , login , forgotPassword , otp , resetPassword, detailUser , allUserinTask  , addnewpost , addnewUser}=require("../controller/user.controller")
const middlewareUser=require("../middleware/user.authozition")
router.post("/register" , userRegister);

router.post("/login", login)

router.post("/password/forgot" , forgotPassword);

router.post("/password/otp" , otp);

router.post("/password/reset" ,resetPassword)

router.get("/detail" , middlewareUser.authUser , detailUser);
router.get("/listAllUser" ,  allUserinTask);
router.post("/api/post" , addnewpost);

router.post("/api/adnewUser" , addnewUser);

module.exports=router;