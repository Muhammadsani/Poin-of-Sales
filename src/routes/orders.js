const express = require('express')
const Route = express.Router()

// Import Controller
const ordersController = require('../controller/orders')
Route
    .post('/order/', ordersController.orderProduct) // order product  
    .get('/order/', ordersController.getOrder) // get all product
    .get('/orderitem/', ordersController.getOrderItem) // get all product
    .get('/getorderinweek/', ordersController.getOrderInWeek) // get all product
    .get('/getorderlastweek/', ordersController.getOrderLastWeek) // get all product
    .get('/getincometoday/', ordersController.getIncomeToday) // get all getincometoday
    .get('/getincomeyear/', ordersController.getIncomeInYear) // get all getincometoday
    .get('/revenue/', ordersController.getRevenue) // get all getincometoday

module.exports = Route