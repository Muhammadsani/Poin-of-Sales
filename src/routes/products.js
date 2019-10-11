const express = require('express')
const Route = express.Router()
const uploadHelper = require('../helpers/uploadimg')
const auth = require('../middlewares/auth')


// Import Controller
const productController = require('../controller/products')
Route
    .get('/', productController.getProducts) // get all product
    .post('/', uploadHelper.upload, productController.addProduct) // add product
    .patch('/:id', auth.access, uploadHelper.upload, productController.updateProduct) // update product
    .patch('/reduce/:id', auth.access, productController.reduceProduct) // reduce product
    .patch('/plus/:id', auth.access, productController.plusProduct) // add quantity product
    .delete('/:id', auth.access, productController.deleteProduct) // delete product 
    .post('/order/', productController.orderProduct) // order product  
    .get('/order/', productController.getOrder) // get all product
    .get('/orderitem/', productController.getOrderItem) // get all product
    .get('/getorderinweek/', productController.getOrderInWeek) // get all product
    .get('/getorderlastweek/', productController.getOrderLastWeek) // get all product
    .get('/getincometoday/', productController.getIncomeToday) // get all getincometoday
    .get('/getincomeyear/', productController.getIncomeInYear) // get all getincometoday
    .get('/revenue/', productController.getRevenue) // get all getincometoday
    .get('/:id', productController.getProduct) // get product by ID


module.exports = Route