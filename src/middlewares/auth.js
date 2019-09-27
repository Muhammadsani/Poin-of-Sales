const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    access : (req, res, next) => {
        const {token} = req.headers
        jwt.verify(token, process.env.JWT_KEY, err => {
            if(err){
                return res.status(401).json({
                    message : "error, you must loggin first"
                })
            }else{
                next()
            }
        })

    }
}