const crypto = require("crypto");
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
  cap: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
});

module.exports = CircusClass;
