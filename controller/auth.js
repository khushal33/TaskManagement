const { use } = require('..')
const User = require('../models/user')
var jwt = require("jsonwebtoken");
const config = require('../config').config[env]

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.JWT_secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        req.email = decoded.email;
        next();
    });
};

const register = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = req.body
            let userExistOrNot = await checkUserExistOrNot(email)
            if (userExistOrNot) {
                let otp = generateOTP()
                let new_user = new User({
                    email,
                    otp,
                    isVerified: false
                })
                new_user.password = new_user.generateHash(password);
                let done = await new_user.save()
                resolve({ status: true, message: done })
            }
        } catch (err) {
            reject({ status: false, message: err.message })
        }
    })
}

const generateOTP = (req, res) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const verifyOTP = (req, res) => {
    return new Promise(async (resolve, reject) => {
        const { email, otp } = req.body
        let userExistOrNot = await checkUserExistOrNot(email)
        if (userExistOrNot.status == false) {
            reject(userExistOrNot)
        } else {
            let new_user = new User({
                email
            })
            new_user.password = new_user.generateHash(password);
            let done = await new_user.save()
            resolve({ status: true, message: done })
        }
    })
}

const login = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email })
            if (user) {
                let isVerified = checkUserVerifiedOrNot(email)
                if (isVerified) {
                    let done = await user.validPassword(password)
                    if (done) {
                        var token = jwt.sign({ id: user.id, email: email }, config.JWT_secret, {
                            expiresIn: 300 //5 mins
                        });
                        resolve({ status: true, message: user, token: token })
                    } else {
                        reject({ status: false, message: "Incorrect username or password" })
                    }
                }
            }else{
                reject({ status: false, message: "User not exists" })
            }
        } catch (err) {
            reject({ status: false, message: err.message })
        }
    })
}

const checkUserVerifiedOrNot = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ email, isVerified: true })
            if (user) {
                resolve({ status: false, message: "" })
            } else {
                reject({ status: true  , message: "OTP not verified"  })
            }
        } catch (err) {
            reject({ status: false, message: err.message })
        }
    })
}

const checkUserExistOrNot = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ email })
            if (user) {
                reject({ status: false, message: "User already exist" })
            } else {
                resolve({ status: true })
            }
        } catch (err) {
            reject(err)
        }
    })
}



module.exports = { register, login, verifyToken, verifyOTP }