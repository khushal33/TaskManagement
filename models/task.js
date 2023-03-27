const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date:{type:Date,required:true},
    status:{type:String,required:true,enum:["Completed","Incomplete"]},
    seqNo:{type:Number,require:true}
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task