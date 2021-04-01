const ctrl = require("../controllers")

function auth(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        req.session.error = 'Access denied!';
        return res.redirect('/login');
    }
}

function guest(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    } else {
        return next();
    }
}

module.exports = router => {
    router.get('/login', guest, ctrl.login.index)
    router.post('/login', ctrl.login.authenticate)
    router.get('/logout', auth, ctrl.login.logout)
    
    router.get('/register', guest, ctrl.register.index)
    router.post('/register', ctrl.register.create)
    
    router.get('/', auth, ctrl.home.index)
}