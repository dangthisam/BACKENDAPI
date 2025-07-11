const Task=require("../model/task.model")
const User=require("../model/user.model")

const md5=require("md5")


const userRegister=async (req,res)=>{


    req.body.password=md5(req.body.password)
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    
    })


    if(existEmail){
    res.json({
        message:"email đã tồn tại",
        status:400
    })
    }else{
        const data= new User(req.body)
        await data.save()

        const tokenUser=data.tokenUser

        res.cookie("tokenUser",tokenUser)
        res.json({
            message:"create account success",
            status:200,
            tokenUser:tokenUser
        })
    }

}

const login = async (req, res) => {
  const { email, password } = req.body;
    const existEmail= await User.findOne({
    email: email,
    deleted: false,
  })

 if(!existEmail){
    res.json({
        message:"email không tồn tại",
        status:400
    })
 }

 if(md5(password) !== existEmail.password){
    res.json({
        message:"password không đúng",
        status:400
    })
 }

    const tokenUser = existEmail.tokenUser;

  res.cookie("tokenUser", tokenUser);
    res.json({
        message:"login success",
        status:200,
        tokenUser:tokenUser
    }   )
}
module.exports={
    userRegister,
    login
}