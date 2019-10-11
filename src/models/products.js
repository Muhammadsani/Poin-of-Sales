const conn = require('../configs/db')

module.exports = {
    getProducts: (sortby, limit, page = 1, search, sorttype) => { 
        const offset = (page - 1) * limit
        return new Promise((resolve, reject) => {
            //conn.query(`SELECT p.id AS id, p.name, p.price, p.image, c.name AS category, p.description, p.quantity, p.date_added, p.date_updated FROM product AS p INNER JOIN categories AS c ON p.category=c.id ${search ? `WHERE p.name LIKE '%${search}%'` : ''} ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''} ${sortby ? `ORDER BY p.${sortby}` : ''}`, 
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
    setOrder: (receipt_no, total_item,user,totalprice,name) => {
        let nameorder=name.join();
        console.log(nameorder)
        const data = {receipt_no: receipt_no, total_item:total_item, user_id: user, total_price:totalprice, name_order: nameorder}
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO orders SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    orderProduct: (receipt_no, product_id, price, quantity) => {
        
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO order_item (order_id, product_id, price, quantity) VALUE (${receipt_no}, ${product_id}, ${price}, ${quantity}) `, 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getOrder: (month, year,page=1, limit) => {
        const offset = (page - 1) * limit
        console.log(month)
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM orders WHERE MONTH(created_at) = ${month} AND YEAR(created_at) = ${year} ORDER BY created_at DESC  ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getOrderItem: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT order_item.*, product.name, orders.* FROM order_item join product on order_item.product_id=product.id join orders on order_item.order_id=orders.receipt_no`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getOrderInWeek: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT order_item.*, product.name, orders.* FROM order_item join product on order_item.product_id=product.id join orders on order_item.order_id=orders.receipt_no WHERE WEEK(created_at) = WEEK(CURDATE())`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getOrderLastWeek: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT order_item.*, product.name, orders.* FROM order_item join product on order_item.product_id=product.id join orders on order_item.order_id=orders.receipt_no WHERE WEEK(created_at) = WEEK(CURDATE())-1`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getIncomeToday: (today,yesterday) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT(SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = DATE('2019-10-12')) AS income, (SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = DATE('2019-10-11')) AS incomeyesterday`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getIncomeInYear: (year) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT SUM(total_price) AS income FROM orders WHERE YEAR(created_at) = ${year} `,
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getRevenue: (orderBy) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT *,SUM(total_price) AS income, EXTRACT(YEAR from created_at) as year, DAYNAME(created_at) as dayname, MONTHNAME(created_at) as monthname, EXTRACT(DAY FROM created_at) AS day, EXTRACT(MONTH FROM created_at) AS month, EXTRACT(WEEK FROM created_at) AS week FROM orders GROUP BY ${orderBy}`,
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