const express = require('express')
const Route = express.Router()

// Import routes
const products = require('./routes/products')
const categories = require('./routes/categories')
const user = require('./routes/user')

Route
    .use('/product', products)
    .use('/categories', categories)
    .use('/user', user)

module.exports = Route