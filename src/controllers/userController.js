const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserSchema = require("../models/userSchema")

const User = mongoose.model("User", UserSchema)

const loginRequired = (req,res,next) => {
    if(req.user){
        next()
    }else {
        return res.status(401).json({message:"Unthorized User"})
    }
}

const register = (req,res) => {
    const newUser = new User(req.body)
    newUser.password = bcrypt.hashSync(newUser.password,10)
    newUser.save((err,user) => {
        if(err){
            res.status(400).send({message:err})
        }else{
            user.password = undefined
            return res.json(user)
        }
    })
}

const login = (req,res) => {
    User.findOne({email:req.body.email}, (err, user) => {
        if(err){
            throw err
        }else if(!user){
            res.status(401).json({message: "Authentication failed.No user found"})
        }else {
            if(!user.comparePasswords(req.body.password,user.password)){
                res.status(401).json({message: "Authentication failed.Incorrect password"})
            }else {
                res.json({token: jwt.sign({
                    email:user.email,
                    username:user.username,
                    _id:user.id
                },'RESTFULAPI')})
            }
        }
    })
}

module.exports ={
    loginRequired,
    login,
    register
}