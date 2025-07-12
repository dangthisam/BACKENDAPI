
const User=require("../model/user.model")
const authUser= async (req, res, next)=>{
   let tokenUser=req.headers.authorization
   if(!tokenUser){
    res.json({
        message:"token khong tồn tại",
        status:400
    })
   }else{
    tokenUser=tokenUser.split(" ")[1]
   
   const user=await User.findOne({
    tokenUser:tokenUser
   }).select("-password")

if(!user){
    res.json({
        message:"user không tồn tại",
        status:400
    })
    return;
}
req.user=user
next();

   }

}

module.exports={authUser}