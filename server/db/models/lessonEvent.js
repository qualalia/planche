const Sequelize = require("sequelize");
const db = require("../db");

const LessonEvent = db.define("lessonEvent", {});

module.exports = LessonEvent;
