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
            
        })
    },
    rearrangeTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            
        })
    },
    deleteTask : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            
        })
    },
}