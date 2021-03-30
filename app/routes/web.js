const loginController = require("../controllers/login");

module.exports = router => {
    router.get("/",         loginController.index);
    router.post("/login",    loginController.login);
}