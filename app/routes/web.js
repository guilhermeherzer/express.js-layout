const ctrl = require("../controllers")

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

module.exports = router => {
    router.get('/login', ctrl.login.index)
    router.post('/login', ctrl.login.authenticate)
    
    router.get('/register', ctrl.register.index)
    router.post('/register', ctrl.register.create)
    
    router.get('/', restrict, ctrl.home.index)
}