const conn = require('../configs/db')

module.exports = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * from categories', 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getCategory: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * from categories WHERE id=?', id ,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    addCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO categories SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateCategory: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE categories SET ? WHERE id=?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteCategories: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE from categories WHERE id=?', data, 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}