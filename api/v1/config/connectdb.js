
require("dotenv").config();
const mongoose = require("mongoose");
module.exports.connect = async()=>{
try {
  await mongoose.connect(process.env.DB_HOST);
  console.log(" connect success")

} catch (error) {
  console.log(error);
  console.log("connect fail ")
  }
  }
