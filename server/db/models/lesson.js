const Sequelize = require("sequelize");
const db = require("../db");

const Lesson = db.define("lesson", {
  startTime: {
    type: Sequelize.DATE,
  },
  endTime: {
    type: Sequelize.DATE,
  },
  day: {
    type: Sequelize.INTEGER,
  },
  cap: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  // recurrence
});

module.exports = Lesson;

const setStartAndEndTimes = lesson => {
  if (!lesson.startTime && !lesson.endTime) {
    lesson.startTime = new Date();
    lesson.endTime = new Date();
    lesson.day = lesson.startTime.getDay();
  } else if (!lesson.endTime) {
    lesson.endTime = lesson.startTime;
  }
};

const setDay = lesson => {
  if (!lesson.day) lesson.day = lesson.startTime.getDay();
};

Lesson.beforeCreate(setStartAndEndTimes);
Lesson.beforeCreate(setDay);
Lesson.beforeUpdate(setStartAndEndTimes);
