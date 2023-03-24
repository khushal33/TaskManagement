const express = require('express')
const router = express.Router()
const taskController = require('../controller/task')
const {verifyToken} = require('../controller/auth')

router.post('/',verifyToken,async (req,res)=>{
    taskController.createTask(req).then((task)=>{
    res.status(200).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.put('/',verifyToken,async (req,res)=>{
    taskController.updateTask(req).then((task)=>{
        res.status(200).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.get('/',verifyToken,async (req,res)=>{
    taskController.getTask(req).then((task)=>{
        res.status(200).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.delete('/',verifyToken,async (req,res)=>{
    taskController.deleteTask(req).then((task)=>{
        res.status(200).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;