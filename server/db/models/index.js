const User = require("./user");
const CircusClass = require("./circusClass");
const LessonEvent = require("./lessonEvent.js");
const Lesson = require("./lesson.js");
const Company = require("./company.js");

// Students n:m with Lesson
Lesson.belongsToMany(User, { through: "LessonStudent" });
User.belongsToMany(Lesson, { through: "LessonStudent" });

// Instructor
CircusClass.belongsTo(User, { as: "instructor" });

// Lessons & CircusClass
CircusClass.hasMany(Lesson);
Lesson.belongsTo(CircusClass);

Lesson.hasMany(LessonEvent);
LessonEvent.belongsTo(Lesson);

Lesson.belongsTo(User, { as: "instructor" });

// Lessons & Companies
Lesson.belongsTo(Company);
Company.hasMany(Lesson);

// Lesson Events
LessonEvent.belongsTo(User);
User.hasMany(LessonEvent);

// Company n:m with User
Company.belongsToMany(User, { through: "CompanyStaff" });
User.belongsToMany(Company, { through: "CompanyStaff" });

CircusClass.belongsTo(Company);
Company.hasMany(CircusClass);

module.exports = {
  User,
  CircusClass,
  Lesson,
  LessonEvent,
  Company,
};
