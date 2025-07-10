const express=require("express")

require("dotenv").config();
const path = require("path");
const database=require("./config/connectdb")
database.connect()
const app=express()

const port=process.env.PORT
const indexRouter=require(path.join(__dirname,"./api/v1/router/index.router"))

require("dotenv").config();



 app.use('' , indexRouter)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)

})