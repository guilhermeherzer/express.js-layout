const userService = require('./../services/user')

exports.index = (req, res, next) => {
    res.render('register')
}

exports.create = (req, res, next) => {
    userService.create(req.body)
    .then((data) => {
        if(data.success === 0){
            req.session.error = data.message
            res.redirect('/register')
        }else{
            req.session.success = data.message
            res.redirect('/login')            
        }
    })
    .catch(next);
}