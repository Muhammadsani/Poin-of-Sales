const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    access : (req, res, next) => {
        try {
            const token = req.headers.authorization.split(/\s/)[1]
            jwt.verify(token, process.env.JWT_KEY, err => {
                if(err){
                    return res.status(403).json({
                        message : "Sorry, you must loggin first"
                    })
                }else{
                    next()
                }
            })
        } catch (err) {
            res.status(401).send({
                message: 'No authorization token set'
            })
        }

    }
}