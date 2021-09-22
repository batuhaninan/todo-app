module.exports = (app) => {
    const Todo = require("../controllers/todo.controller.js");
  
    var router = require("express").Router();
  
    router.route("/").get(Todo.findAll).post(Todo.create).delete(Todo.deleteAll)
    router.route("/:id").get(Todo.findOne).delete(Todo.delete).put(Todo.toggleFinished)



    app.use('/api/todos', router);
  };