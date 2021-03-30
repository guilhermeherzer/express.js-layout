var express = require('express')
var consign = require('consign')
var path = require('path')

var app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './../app/views'))

const router = express.Router()

app.use(router)
app.use(express.static(path.join(__dirname, './app/public')))
app.use(express.urlencoded({ extended: true }))

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app