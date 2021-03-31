var express = require('express')
var path = require('path')
var session = require('express-session');
var consign = require('consign')

var app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './../app/views'))

const router = express.Router()

app.use(router)
app.use(express.static(path.join(__dirname, './../app/public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

app.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

consign()
.include('app/routes')
.then('app/models/index.js')
.then('app/controllers')
.into(app)

module.exports = app