const User = require("./user");
const CircusClass = require("./circusClass");
const LessonEvent = require("./lessonEvent.js");
const Lesson = require("./lesson.js");

//CircusClass.hasMany(User, { as: "student" });
CircusClass.belongsToMany(User, { through: "StudentClass" });
User.belongsToMany(CircusClass, { through: "StudentClass" });
CircusClass.belongsTo(User, { as: "instructor" });
Lesson.hasMany(LessonEvent);
CircusClass.hasMany(Lesson);
LessonEvent.belongsTo(User);
User.hasMany(LessonEvent);

module.exports = {
  User,
  CircusClass,
  Lesson,
  LessonEvent,
};
