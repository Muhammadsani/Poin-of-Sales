const express = require('express')
const Route = express.Router()

// Import Controller
const categoriesController = require('../controller/categories')
Route
    .get('/', categoriesController.getCategories) // GET All data Categories
    .get('/:id', categoriesController.getCategory) // GET One data Category By id
    .post('/', categoriesController.addCategories) // Add Category
    .patch('/:id', categoriesController.updateCategory) // UPDATE data Category By id
    .delete('/:id', categoriesController.deleteCategory) // Delete data Category By id


module.exports = Route