const userService = require('./../services/user')

class Login {
    index = (req, res, next) => {
        res.render('login')
    }
    
    authenticate = (req, res, next) => {
        userService.authenticate(req.body)
        .then((data) => {
            if(data.success){
                req.session.regenerate(function(){
                    req.session.user = data.user;
                    req.session.success = data.message
                    res.redirect('/');
                })
            }else{
                req.session.error = data.message
                res.redirect('/login')
            }
        })
        .catch(next);
    }
}

module.exports = new Login()