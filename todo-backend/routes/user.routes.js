module.exports = (app) => {
    const User = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.route("/").get(User.findAll).post(User.create).delete(User.deleteAll)
    router.route("/:id").get(User.findOne).delete(User.delete)



    app.use('/api/users', router);
  };