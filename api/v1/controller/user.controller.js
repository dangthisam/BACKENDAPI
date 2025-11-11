const Task=require("../model/task.model")
const User=require("../model/user.model")

const ForgotPassword=require("../model/passwordReset")
const helpGenerateRandomNumber=require("../helper/generate")
const middlewareUser=require("../middleware/user.authozition")
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

        const tokenUser=helpGenerateRandomNumber.generateRandomString(32)
        const data= new User({
            ...req.body,
            tokenUser:tokenUser
        })
        
        await data.save()

        const tokenUsesr=data.tokenUser

        res.cookie("tokenUser",tokenUser)
        res.json({
            message:"create account success",
            status:200,
            tokenUsers:tokenUser
        })
    }

}

const user=[
    {
        email:"samnvhn@gmail.com",
        password:"123456"
    },
    {
        email:"dangthuy@gmail.com",
        password:"abcdef"
    }
]
const login = async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        res.json({
            message:"vui lòng nhập đầy đủ thông tin",  
            status:400
        })
        return;
    }
    
    if(email !== user[0].email || password !== user[0].password){
        res.json({
            message:"email hoặc password không đúng",
            status:400
        })
        return;
    }
    if(email === user[0].email && password === user[0].password){
        res.json({
            message:"login success",
            status:200
        })
        return;
    }
//   const { email, password } = req.body;
//     const existEmail= await User.findOne({
//     email: email,
//     deleted: false,
//   })

//  if(!existEmail){
//     res.json({
//         message:"email không tồn tại",
//         status:400
//     })
//  }

//  if(md5(password) !== existEmail.password){
//     res.json({
//         message:"password không đúng",
//         status:400
//     })
//  }

//     const tokenUser = existEmail.tokenUser;

//   res.cookie("tokenUser", tokenUser);
//     res.json({
//         message:"login success",
//         status:200,
//         tokenUser:tokenUser
//     }   )
res.json({
    message:"login success",
    status:200
})
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


const objectAuth={
    email:email,
    otp:otp,
    expireAt:Date.now() 
     
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



const otp=async (req,res)=>{
    const {email,otp}=req.body


    const exitsOtp=await ForgotPassword.findOne({
        email:email,
        otp:otp
    })

    if(!exitsOtp){
        res.json({
            message:"otp không đúng",
            status:400
        })
    }

    const user=await User.findOne({
        email:email,
        deleted:false
    })

    
    res.cookie("tokenUser",user.tokenUser)


    res.json({
        message:"auth otp success",
        status:200,
        tokenUser:user.tokenUser
    })

    

}

const resetPassword=async (req,res)=>{
const tokenUser=req.cookies.tokenUser
const {password}=req.body

const user=await User.findOne({
    tokenUser:tokenUser
})
if(md5(password) === user.password){
    res.json({
        message:"mật khẩu mới không được trùng với mật khẩu cũ",
        status:400
    })
    return;
}

await User.updateOne({
    tokenUser:tokenUser
},{
    password:md5(password)
})

    res.json({
        message:"reset password success",
        status:200
    })


}

const detailUser=async (req,res)=>{


res.json({
    message:"success",
    status:200,
    data:req.user
})

}

const allUserinTask=async (req,res)=>{

    const users=await User.find({
        deleted:false
    }).select("fullName email");

    res.json({
        message:"success",
        status:200,
        data:users
    })



}

const BlogPost =[
    {
        slug: "first-blog-post",
title: "First Blog Post",
description: "Lorem ipsum dolor sit amet, consectet",
content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        slug: "second-blog-post",
title: "Second Blog Post",
description: "Ut enim ad minim veniam, quis nostrud exercitation",
content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }

]

const addnewpost =async (req,res)=>{
    const post={
        slug: req.body.slug,
        title: req.body.title,
        description: req.body.description,
    }
    BlogPost.push(post);
    res.json({
        message:"add new post success",
        status:200,
        data:post
    })
    console.log(BlogPost);
}


const addnewUser=async (req,res)=>{
    const user={
        email:req.body.email,
        password:req.body.password
    }
    // user.push(user);
     res.json({
        message:"add new user success",
        status:200,
        data:user
    })
    console.log(user);
    }
   


module.exports={
    userRegister,
    login,
    forgotPassword,
    otp,
    resetPassword,
    detailUser,
    allUserinTask,
    addnewpost,
    addnewUser
}