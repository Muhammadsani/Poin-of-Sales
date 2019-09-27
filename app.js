//import all depedencies required
const express = require('express')  //import es5     //import es6 => import express from express
var cors = require('cors')          // Enable All CORS Requests (Access-Control-Allow-Origin)
const bodyParser = require('body-parser')
const logger = require('morgan')    // morgan for logger
const routeNav = require('./src/index')

// use app
const app = express()       // use express
app.use(cors())             // use CORS
app.use(bodyParser.json())  // use bodyparser from json
app.use(bodyParser.urlencoded({extended: true})) // use bodyparser from url-encoded
app.use(logger('dev'))      // use morgan for logger

// define PORT
const port = process.env.SERVER_PORT || 3000

// start server
app.listen(port, function(){
    console.log('Server has running on port: ' + port)
})

app.use('/', routeNav)

app.get('*', (req,res) => {     // hadle
    res.send('Sorry, 404 Page not fund')
})