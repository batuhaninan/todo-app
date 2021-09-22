module.exports = (sequelize, Sequelize) => {
    const User = require("./user.model")(sequelize, Sequelize);

    const Todo = sequelize.define("todo", {
      text: {
        type: Sequelize.STRING,
      },
      isFinished: {
        type: Sequelize.BOOLEAN
      },
    },{
      underscored: false
    });
  
    Todo.belongsTo(User);

    return Todo;
  };