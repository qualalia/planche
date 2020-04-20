const Sequelize = require("sequelize");
const db = require("../db");

const Company = db.define("company", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Company;
