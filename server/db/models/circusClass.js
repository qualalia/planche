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
  },
  endTime: {
    type: Sequelize.DATE,
  },
  day: {
    type: Sequelize.INTEGER,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = CircusClass;

const setDay = circusClass => {
  if (!circusClass.day) circusClass.day = circusClass.startTime.getDay();
};

const setStartAndEndTimes = circusClass => {
  if (!circusClass.startTime && !circusClass.endTime) {
    circusClass.startTime = new Date();
    circusClass.endTime = new Date();
    circusClass.day = circusClass.startTime.getDay();
  } else if (!circusClass.endTime) {
    circusClass.endTime = circusClass.startTime;
  }
};

CircusClass.beforeCreate(setStartAndEndTimes);
CircusClass.beforeCreate(setDay);
CircusClass.beforeUpdate(setStartAndEndTimes);
