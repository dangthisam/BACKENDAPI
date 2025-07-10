const express=require("express")
const bodyParser = require('body-parser');
require("dotenv").config();
const path = require("path");
const database=require("./config/connectdb")
database.connect()
const app=express()

const port=process.env.PORT
const indexRouter=require(path.join(__dirname,"./api/v1/router/index.router"))

require("dotenv").config();
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


 app.use('' , indexRouter)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)

})