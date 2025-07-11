const Task=require("../model/task.model")
const User=require("../model/user.model")

const ForgotPassword=require("../model/passwordReset")
const helpGenerateRandomNumber=require("../helper/generate")

const helpSendMail=require("../helper/sendMail")

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

const forgotPassword=async (req,res)=>{
    const email=req.body.email
 

    const existEmail=await User.findOne({
        email:email,
        deleted:false
    })

if(!existEmail){
    res.json({
        message:"email không tồn tại",
        status:400
    })
}
//save data auth in db
const otp=helpGenerateRandomNumber.generateRandomNumber(8)

const timeExpire=5;
const objectAuth={
    email:email,
    otp:otp,
    expireAt:Date.now() +timeExpire*5
     
}

const data=new ForgotPassword(objectAuth)
await data.save()
//end save info auth in database

//start sent otp to email
const subject ="Mã OTP để khôi phục mật khẩu"
const html=`Mã OTP để khôi phục mật khẩu là <b>${otp}</b>`

helpSendMail.sendEmail(email,subject,html)
//end sent otp to email


    res.json({
        message:"sent otp to email success",
        status:200
    })

}
module.exports={
    userRegister,
    login,
    forgotPassword
}