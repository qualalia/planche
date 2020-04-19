const Sequelize = require("sequelize");
const db = require("../db");

const CircusClass = db.define("circusClass", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  company: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = CircusClass;
