const conn = require('../configs/db')

module.exports = {
    
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
            conn.query(`SELECT(SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = DATE('${today}')) AS income, (SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = DATE('${yesterday}')) AS incomeyesterday`,
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