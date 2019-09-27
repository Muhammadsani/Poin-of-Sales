//import models
const categoriesModel = require('../models/categories')

module.exports = {
    getCategories: (req, res) => { // GET all categories
        categoriesModel.getCategories()
            .then(result => {
                res.json({
                    result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all category from database'
                })
            })
    },
    getCategory: (req, res) => {   // GET one Category By ID
        const id = req.params.id 
        categoriesModel.getCategory(id)
            .then(result => {
                res.json({
                    result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error getting all category from database'
                })
            })
    },
    addCategories: (req, res) => {  // ADD Category
        const { name } = req.body
        const data = { name }

        categoriesModel.addCategories(data)
        .then(result => {
            res.json({
                status: 200,
                message: 'success adding category',
                data
            })
        })
        .catch(err => {
            console.log(err) 
            res.status(500).json({
                status: 500,
                message: 'error adding new category'
            })
        })
    },
    updateCategory: (req, res) => { // UPDATE Category
        const date_updated = new Date()
        const data = { ...req.body, date_updated }
        const id = req.params.id
        console.log(data)
        categoriesModel.updateCategory([data, id])
        .then(result => {
            res.json({
                status: 200,
                message: 'success updating category',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: 500,
                message: 'error updating new category'
            })
        })
    },
    deleteCategory: (req, res) => { // delete category by ID
        const {id} = req.params
        const data = id
        productModel.deleteProduct(data)
            .then(result => {
                res.json({
                    status: 200,
                message: 'Category already deleted',
                data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    message: 'error delete category from database'
                })
            })
    }
}