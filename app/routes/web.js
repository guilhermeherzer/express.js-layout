const loginController = require("../controllers/login");
const registerController = require("../controllers/register");

module.exports = router => {
    router.get('/login', loginController.index)

    router.get('/register', registerController.index)
    router.post('/register', registerController.create)
}