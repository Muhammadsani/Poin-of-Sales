//import models
const ordersModel = require('../models/orders')
const productModel = require('../models/products')

module.exports = {
    
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

            ordersModel.setOrder(receipt_no,total_item,req.body.order[0].user,req.body.totalPrice,name)
                .then(result => {
                    req.body.order.forEach(item => {
                        ordersModel.orderProduct(receipt_no, item.id, item.price, item.count)
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

    getOrder: (req, res) => {
        const {month, year, page}=req.query
        const limit= 20
        console.log(month)
        ordersModel.getOrder(month, year, page, limit)
            .then(async result => {
                const jumlah = await ordersModel.getOrder(month, year, page, null)
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
        ordersModel.getOrderItem()
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
        ordersModel.getOrderInWeek()
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
        ordersModel.getOrderLastWeek()
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
        ordersModel.getIncomeToday(date,yesterday)
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
        ordersModel.getIncomeInYear(year)
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
        ordersModel.getRevenue(orderBy)
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