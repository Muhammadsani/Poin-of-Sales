//import models
const productModel = require('../models/products')

module.exports = {
    getProducts: (req, res) => { //get all product
        const {search, limit, page, sort} = req.query
        
        productModel.getProducts(sort, limit, page, search)
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
    getProduct: (req, res) => { // get product by ID
        const {id} = req.params
        const data = id
        productModel.getProduct(data)
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
    addProduct: async (req, res) => { // Add Product
        const { name , price , category , description , quantity } = req.body
        const image = req.file.filename
        const data = { name , price , image , category , description , quantity }

       // upload.single(req.file.filename
        console.log(req.file.filename)

        if(req.body.quantity >= 0){
            let isProductAvaileble = await productModel.getProductByName(name)
            console.log(isProductAvaileble[0].product)
            if( isProductAvaileble[0].product== 0){ //handler duplicate name of product
                productModel.addProduct(data)
                .then(result => {
                    res.json({
                        status: 200,
                        message: 'success adding data',
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
                res.json({
                    status: 400,
                    message: 'Error, Product already in database!',
                    name 
                })
            }
        }else{
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }    
    },
    updateProduct: (req, res) => {  // UPDATE Product
        const date_updated = new Date()

        const { name , price , category , description , quantity } = req.body
        const image = req.file.filename
        const data = { name , price , image , category , description , quantity, date_updated }

        //const data = { ...req.body, date_updated }
        const {id} = req.params
        const idProduct = id
        
        if (quantity && quantity < 0) {
            res.status(400).json({
                status: 400,
                message: 'quantity cannot below 0'
            })
        } else {
            productModel.updateProduct([data, idProduct])
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
        }
        
    },
    reduceProduct: async (req, res) => {  // Reduce Product
        const date_updated = new Date()
        let { quantity } = req.body        
        const {id} = req.params
        const idProduct = id
        const quantityProduct = await productModel.getProduct(idProduct)    //GET quantity product
        const newQuantity = quantityProduct[0].quantity - quantity
        if(newQuantity >= 0){  // quantity Product cannot below 0
            quantity = newQuantity
            const data = { quantity, date_updated }
            productModel.updateProduct([data, idProduct])
            .then(result => {
                res.json({
                    status: 200,
                    message: 'success reduce product',
                    quantity
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error reduce product'
                })
            })
        }else{
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }
    },
    plusProduct: async (req, res) => {
        const date_updated = new Date()
        let quantity = req.body.quantity        
        const {id} = req.params
        const idProduct = id
        const quantityProduct = await productModel.getProduct(idProduct)    //GET quantity product
        const newQuantity = quantityProduct[0].quantity + parseInt(quantity)
        console.log(newQuantity)
        if(newQuantity >= 0){  // quantity Product cannot below 0
            quantity = newQuantity
            const data = { quantity, date_updated }
            productModel.updateProduct([data, idProduct])
            .then(result => {
                res.json({
                    status: 200,
                    message: 'success add quantity product',
                     quantity
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error plus product'
                })
            })
        }else{
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }
    },
    deleteProduct: (req, res) => { // delete product by ID
        const {id} = req.params
        const data = id
        productModel.deleteProduct(data)
            .then(result => {
                res.json({
                    status: 200,
                message: 'Data already deleted',
                data
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
    uploadProduct: (req, res) => {
        res.send(req.file)
        console.log(req.file)
    }
    
}