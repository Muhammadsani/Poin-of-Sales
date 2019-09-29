const express = require('express')
const Route = express.Router()
const auth = require('../middlewares/auth')

const userController = require('../controller/user')
Route
    .get('/', auth.access, userController.getUsers) 
    .post('/signup', userController.addUser) 
    .post('/login', userController.loginUser) 
    .patch('/:id', auth.access, userController.updateUser)


module.exports = Route