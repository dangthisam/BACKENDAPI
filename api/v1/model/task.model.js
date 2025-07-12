const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
       title:String,
       status:{
        type:String,
       enum: ["pending", "initial", "doing", "inconclusive", "finished"],

        default:"pending"
       },

       parentId:String,
       listUser:Array,
       createdBy:String,
       content:String,
       timeStart:Date,
       timeFinish:Date,
       deleted:{
        type:Boolean,
        default:false
       },
       deletedAt:Date
    },
    {
        timestamps: true,
       
    }
  
);


const Task = mongoose.model('Task', taskSchema ,"tasks");

module.exports = Task;