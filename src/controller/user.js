//import models
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    getUsers: (req, res) => { //get all user
        userModel.getUsers()
            .then(result => {
                res.json({
                    result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all data from database'
                })
            })
    },
    addUser: async (req, res) =>{
        const email = String(req.body.email).toLocaleLowerCase()
        const password = req.body.password
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const validEmail = regexEmail.test(email)
        if(validEmail){
            console.log(validEmail)
            const isRegistered = await userModel.getByEmailUsers(email)
            if(isRegistered.length==0){
                await userModel.addUser(email, password)
                .then(result => {
                    res.json({
                        status: 200,
                        message: 'success, your account regitered',
                        result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        status: 500,
                        message: 'error adding new data'
                    })
                })
            }else{
                    res.status(400).json({
                        status: 400,
                        message: 'error adding new data, email already'
                    })
            }
        }else{
            res.status(400).json({
                status: 400,
                message: 'error adding new data, email is not valid'
            })
        }

    },
    loginUser: async (req, res) => {
        const email = String(req.body.email).toLocaleLowerCase()
        const isRegistered = await userModel.getByEmailUsers(email)
        if(isRegistered.length>0){
            bcrypt.compare(req.body.password, isRegistered[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        status: 401,
                        message: 'error, password incorrect'
                    })
                }
                
                if (result) {
                    const token = jwt.sign({
                        email : email,
                        id : isRegistered[0].id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn : '1h'
                    })
                    res.status(200).json({
                        status: 200,
                        message: 'success login',
                        token: token
                    })
                } else {
                    res.status(401).json({
                        status: 401,
                        message: 'password invalid'
                    })
                }
            })
        }else{
            res.status(401).json({
                status: 401,
                message: 'error, email doesn\'t exist'
            })
        }
    },
    updateUser: (req, res) => {
        const {email, password} = req.body
        const {id} = req.params
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const validEmail = regexEmail.test(email)

        if (validEmail) {
            userModel.updateUser(id,email,password)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'success Updating data',
                    data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error updating new data'
                })
            })
        } else {
            console.log(err)
                res.status(400).json({
                    status: 400,
                    message: 'error updating, email is not valid'
                })
                
        }
    }
}