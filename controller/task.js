const Task = require('../models/task')

module.exports = {
    createTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
            const {date , name , status } = req.body;
            const {userId} = req;
            console.log(userId)
            let seqNo = await Task.find({user:userId},{seqNo:1}).sort({seqNo:-1}).limit(1)
            console.log(seqNo)
            if(seqNo.length == 0 ){
                seqNo = 1
            }else{
                seqNo = seqNo[0].seqNo + 1
            }
            let data = await Task.create({name,user:userId,date:new Date(date),status,seqNo})
            resolve({status:true, data})
            }catch (err) {
                reject({status:false, message:err.message})
            }
        })
    },
    getTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {userId} = req;
                let data = await Task.find({user:userId}).sort({seqNo:1})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    }, 
    updateTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {_id,date,status,name} = req.body;
                let data = await Task.updateOne({_id},{$set:{date,status,name}},{new: true, runValidators: true})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
    rearrangeTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            const {sourceSeq,destSeq} = req.body;
            const {userId}=req
            if(sourceSeq <= destSeq){
                await Task.findOneAndUpdate({user:userId ,seqNo:sourceSeq},{$set:{seqNo:sourceSeq - 0.5}},{new: true, runValidators: true})
                await Task.updateMany({user:userId , $and:[{seqNo:{$gt:sourceSeq,$lte:destSeq}}]},{ $inc: {seqNo: -1}},{new: true, runValidators: true})
                await Task.findOneAndUpdate({user:userId ,seqNo:sourceSeq - 0.5},{$set:{seqNo:destSeq}},{new: true, runValidators: true})
                resolve({status:true,message:"sucess"})
            }else{
                await Task.findOneAndUpdate({user:userId ,seqNo:sourceSeq},{$set:{seqNo:sourceSeq + 0.5}},{new: true, runValidators: true})
                await Task.updateMany({user:userId , $and:[{seqNo:{$gte:destSeq,$lt:sourceSeq}}]},{ $inc: {seqNo: 1}},{new: true, runValidators: true})
                await Task.findOneAndUpdate({user:userId ,seqNo:sourceSeq + 0.5},{$set:{seqNo:destSeq}},{new: true, runValidators: true})
                resolve({status:true,message:"sucess"})
            }
        })
    },
    deleteTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {_id} = req.params;
                let data = await Task.deleteOne({_id})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
}