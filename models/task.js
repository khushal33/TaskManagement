const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    date:{type:date,required:true},
    status:{type:String,required:true,enum:["Completed","Incomplete"]},
    seqNo:{type:Number,require:true,unique:true}
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task