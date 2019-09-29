const express = require('express')
const Route = express.Router()
const uploadHelper = require('../helpers/uploadimg')
const auth = require('../middlewares/auth')


// Import Controller
const productController = require('../controller/products')
Route
    .get('/', productController.getProducts) // get all product
    .get('/:id', productController.getProduct) // get product by ID
    .post('/', auth.access, uploadHelper.upload, productController.addProduct) // add product
    .patch('/:id', auth.access, uploadHelper.upload, productController.updateProduct) // update product
    .patch('/reduce/:id', auth.access, productController.reduceProduct) // reduce product
    .patch('/plus/:id', auth.access, productController.plusProduct) // add quantity product
    .delete('/:id', auth.access, productController.deleteProduct) // delete product 


module.exports = Route