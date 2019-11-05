const conn = require('../configs/db')

module.exports = {
    getProducts: (sortby, limit, page = 1, search, sorttype) => { 
        const offset = (page - 1) * limit
        return new Promise((resolve, reject) => {
            conn.query(`SELECT p.id AS id, p.name, p.price, p.image, c.name AS category, p.description, p.quantity, p.date_added, p.date_updated FROM product AS p INNER JOIN categories AS c ON p.category=c.id ${search ? `WHERE p.name LIKE '%${search}%'` : ''} ${sortby ? `ORDER BY p.${sortby}` : 'ORDER BY p.id'} ${sorttype} ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}`, 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    searchProduct: (search) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT p.id AS id, p.name, p.price, p.image, c.name AS category, p.description, p.quantity, p.date_added, p.date_updated FROM product AS p INNER JOIN categories AS c ON p.category=c.id WHERE p.name LIKE ?', [`%${search}%`], 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM product WHERE id=?`, [data],
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getProductByName: (name)=>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT COUNT(id) AS product from product WHERE name = ?', [name],
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    addProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO product SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE product SET ? WHERE id=?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE from product WHERE id=?', data, 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
}