const { Lesson, User, Company, CircusClass } = require("../db/models");
const { Op } = require("sequelize");

class LessonQueryBuilder {
  constructor() {
    this.where = {};
    this.include = [{ model: CircusClass }, { model: User, as: "instructor" }];
    this.order = [];
  }
  filterByStartTime(dateParam) {
    if (!dateParam) {
      return this;
    }
    const date = new Date(dateParam);
    const endOfDay = new Date(new Date().setDate(date.getDate())).setHours(
      23,
      59,
      59,
      999
    );
    this.where.startTime = {
      [Op.gte]: new Date(dateParam),
      [Op.lt]: endOfDay,
    };
    return this;
  }

  filterByInstructor(instructorParam) {
    if (!instructorParam) return this;

    const instructors = Array.isArray(instructorParam)
      ? instructorParam.map(instructor => ({
          displayName: instructor,
        }))
      : [{ displayName: instructorParam }];

    this.include.push({
      model: User,
      as: "instructor",
      attributes: ["id", "displayName", "userType", "bio"],
      where: { [Op.or]: instructors },
    });

    return this;
  }

  filterByCompany(companyParam) {
    if (!companyParam) return this;

    const companies = Array.isArray(companyParam)
      ? companyParam.map(company => ({
          name: company,
        }))
      : [{ name: companyParam }];

    this.include.push({
      model: Company,
      where: { [Op.or]: companies },
    });

    return this;
  }

  /*  filterByDay(dayParam) {
    if (!dayParam) return this;

    const days = Array.isArray(dayParam)
      ? dayParam.map(day => ({
          name: day,
        }))
      : [{ name: dayParam }];

    this.where.days = {
      [Op.or]: days,
    };
    
    return this;
  }*/

  orderBy(orderParam, direction) {
    if (!orderParam) this.order.push(["startTime", "ASC"]);
    else this.order.push([orderParam, direction]);
    return this;
  }

  getLessons() {
    return Lesson.findAll({
      where: this.where,
      include: this.include,
      order: this.order,
    });
  }
}

module.exports = LessonQueryBuilder;
