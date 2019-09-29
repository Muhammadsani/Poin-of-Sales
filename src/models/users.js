const conn = require('../configs/db')
const bcrypt = require('bcryptjs')

module.exports = {
    getUsers: () => { 
        return new Promise((resolve, reject) => {
            conn.query('SELECT * from users', 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getByEmailUsers: (email) => { 
        return new Promise((resolve, reject) => {
            conn.query('SELECT * from users WHERE email=?',[email], 
            (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    addUser: (email, passwordNotHash) =>{
        return new Promise( async (resolve, reject) => {
            let password = await bcrypt.hash(passwordNotHash, 10)
            const data = { email, password}
            conn.query('INSERT INTO users SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateUser: (id, email, passwordNotHash) => {
        return new Promise( async (resolve, reject) => {
            let password = await bcrypt.hash(passwordNotHash, 10)
            const data = { email, password}
            conn.query(`UPDATE product SET ? WHERE id=?`, data, id, (err, result) => {
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}