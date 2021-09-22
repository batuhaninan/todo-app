const {
    HOST,
    USER,
    PASSWORD,
    DB,
    dialect,
    pool
} = require("../config/db.config");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  operatorsAliases: 0,
  pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.todo = require("./todo.model.js")(sequelize, Sequelize);

// db.todo.drop();
// db.user.drop();
module.exports = db;