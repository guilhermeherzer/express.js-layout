exports.index = (req, res, next) => {
    res.render("login")
}

exports.login = (req, res, next) => {
    console.log('Login')
}