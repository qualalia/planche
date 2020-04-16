const User = require("./user");
const CircusClass = require("./circusClass");

//CircusClass.hasMany(User, { as: "student" });
CircusClass.belongsToMany(User, { through: "StudentClass" });
User.belongsToMany(CircusClass, { through: "StudentClass" });

CircusClass.belongsTo(User, { as: "instructor" });

//User.hasMany(CircusClass);

module.exports = {
  User,
  CircusClass,
};
