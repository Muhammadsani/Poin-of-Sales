//import models
const productModel = require('../models/products')

module.exports = {
    getProducts: (req, res) => { //get all product
        const { search, limit, page, sort, sorttype } = req.query
        productModel.getProducts(sort, limit, page, search, sorttype)
            .then(async result => {
                const jumlah = await productModel.getProducts(sort, null, page, search, sorttype)
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all data',
                    totalData: jumlah.length,
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
        const { id } = req.params
        const data = id
        productModel.getProduct(data)
            .then(result => {
                if (result.length == 0) {
                    res.status(404).json({
                        status: 404,
                        message: 'Data doesn\'t exist'
                    })
                } else {
                    res.json({
                        result
                    })
                }
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
        let data
        if (!req.file) { // Handler if image doesnt upload
            data = { ...req.body }

        } else {
            const image = req.file.filename
            data = { image, ...req.body }
        }

        const quantity = (req.body.quantity) ? req.body.quantity : 0
        console.log(quantity)
        if (quantity >= 0) {
            let isProductAvaileble = await productModel.getProductByName(req.body.name)
            console.log(isProductAvaileble[0].product)
            if (isProductAvaileble[0].product == 0) { //handler duplicate name of product
                productModel.addProduct(data)
                    .then(result => {
                        res.json({
                            status: 200,
                            message: 'success adding data',
                            data
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            status: 500,
                            message: 'error adding new data'
                        })
                    })
            } else {
                res.json({
                    status: 400,
                    message: 'Error, Product already in database!',
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }
    },

    orderProduct: async (req, res) => {
        const id = req.body.order[0].id
        const Product = await productModel.getProduct(id)    //GET quantity product
        let quantityProduct = JSON.parse(JSON.stringify(Product[0]))
        let newQuantity = quantityProduct.quantity - req.body.order[0].count
        console.log(req.body.totalPrice)
        if (newQuantity >= 0) {  // quantity Product cannot below 0
            quantity = newQuantity
            const data = { quantity }
            productModel.updateProduct([data, id])
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
            const receipt_no = Date.now()
            const total_item= req.body.order.length
            let name= []
            req.body.order.forEach(item => {
                name.push(item.name)
            })

            productModel.setOrder(receipt_no,total_item,req.body.order[0].user,req.body.totalPrice,name)
                .then(result => {
                    req.body.order.forEach(item => {
                        productModel.orderProduct(receipt_no, item.id, item.price, item.count)
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            res.status(400).json({
                status: 400,
                message: 'Sorry, Stockout'
            })
        }

    },

    updateProduct: (req, res) => {  // UPDATE Product

        //const { name , price , category , description , quantity } = req.body
        let data
        if (!req.file) { // Handler if image doesnt upload
            data = { ...req.body }

        } else {
            const image = req.file.filename
            data = { image, ...req.body }
        }

        const { id } = req.params
        const idProduct = id

        if (req.body.quantity && req.body.quantity < 0) {
            return res.status(400).json({
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
        const { id } = req.params
        const idProduct = id
        const quantityProduct = await productModel.getProduct(idProduct)    //GET quantity product
        const newQuantity = quantityProduct[0].quantity - quantity
        if (newQuantity >= 0) {  // quantity Product cannot below 0
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
        } else {
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }
    },
    plusProduct: async (req, res) => {
        const date_updated = new Date()
        let quantity = req.body.quantity
        const { id } = req.params
        const idProduct = id
        const quantityProduct = await productModel.getProduct(idProduct)    //GET quantity product
        const newQuantity = quantityProduct[0].quantity + parseInt(quantity)
        console.log(newQuantity)
        if (newQuantity >= 0) {  // quantity Product cannot below 0
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
        } else {
            res.status(400).json({
                status: 400,
                message: 'Quantity cannot below 0'
            })
        }
    },
    deleteProduct: (req, res) => { // delete product by ID
        const { id } = req.params
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
    },

    getOrder: (req, res) => {
        const {month, year, page}=req.query
        const limit= 20
        console.log(month)
        productModel.getOrder(month, year, page, limit)
            .then(async result => {
                const jumlah = await productModel.getOrder(month, year, page, null)
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all order',
                    totalData: jumlah.length,
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all order from database'
                })
            })
    },
    getOrderItem: (req, res) => {
        productModel.getOrderItem()
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all order Item',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all order Item from database'
                })
            })
    },
    getOrderInWeek: (req, res) => {
        productModel.getOrderInWeek()
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all order Item in a week',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all order Item in a week from database'
                })
            })
    },
    getOrderLastWeek: (req, res) => {
        productModel.getOrderLastWeek()
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all order Item in a week',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all order Item in a week from database'
                })
            })
    },
    getIncomeToday: (req, res) => {
        const today= new Date()
        const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        const yesterday = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()-1}`
        console.log(date)
        console.log(yesterday)
        productModel.getIncomeToday(date,yesterday)
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all income today',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all  income today'
                })
            })
    },
    getIncomeInYear: (req, res) => {
        const today= new Date()
        const year = `${today.getFullYear()}`
        console.log(year)
        productModel.getIncomeInYear(year)
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all income this Year',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all  income this Year'
                })
            })
    },
    getRevenue: (req, res) => {
        const {orderBy}=req.query
        productModel.getRevenue(orderBy)
            .then(async result => {
                res.status(200).json({
                    status: 200,
                    message: 'Sucses get all income this Year',
                    result
                })
            })

            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all  income this Year'
                })
            })
    },
}