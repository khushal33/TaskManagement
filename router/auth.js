const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')

router.post('/login',async (req,res)=>{
    authController.login(req).then((user)=>{
    res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.post('/register',async (req,res)=>{
    authController.register(req).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;