const express = require('express')
const Route = express.Router()
const uploadHelper = require('../helpers/uploadimg')


// Import Controller
const productController = require('../controller/products')
Route
    .get('/', productController.getProducts) // get all product
    .get('/:id', productController.getProduct) // get product by ID
    .post('/', uploadHelper.upload, productController.addProduct) // add product
    .patch('/:id', uploadHelper.upload, productController.updateProduct) // update product
    .patch('/reduce/:id', productController.reduceProduct) // reduce product
    .patch('/plus/:id', productController.plusProduct) // add quantity product
    .delete('/:id', productController.deleteProduct) // delete product 
    //.post('/img', fileUpload, productController.uploadProduct)


module.exports = Route