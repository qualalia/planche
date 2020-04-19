const User = require("./user");
const CircusClass = require("./circusClass");
const LessonEvent = require("./lessonEvent.js");
const Lesson = require("./lesson.js");

// Students n:m with Lesson
Lesson.belongsToMany(User, { through: "StudentLesson" });
User.belongsToMany(Lesson, { through: "StudentLesson" });

// Instructor
CircusClass.belongsTo(User, { as: "instructor" });

// Lessons
CircusClass.hasMany(Lesson);
Lesson.hasMany(LessonEvent);

// Lesson Events
LessonEvent.belongsTo(User);
User.hasMany(LessonEvent);

module.exports = {
  User,
  CircusClass,
  Lesson,
  LessonEvent,
};
