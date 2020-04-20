const router = require("express").Router();
const { Lesson, CircusClass, User } = require("../db/models");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const whereClause = {};
    if (req.query.date) {
      const date = new Date(req.query.date);
      const endOfDay = new Date(new Date().setDate(date.getDate())).setHours(
        23,
        59,
        59,
        999
      );
      whereClause.startTime = {
        [Op.gte]: new Date(req.query.date),
        [Op.lt]: endOfDay,
      };
    }
    const allLessons = await Lesson.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "displayName", "userType", "bio"],
        },
        {
          model: CircusClass,
          include: {
            model: User,
            as: "instructor",
            attributes: ["id", "displayName", "userType", "bio"],
          },
        },
      ],
      order: [["startTime", "ASC"]],
      //      limit: 2,
    });
    if (allLessons.length) {
      res.json(allLessons);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (typeof parseInt(req.params.id) !== "number") res.sendStatus(404);
    else {
      const singleLesson = await Lesson.findByPk(req.params.id, {
        include: [
          {
            model: CircusClass,
            include: {
              model: User,
              as: "instructor",
              attributes: ["id", "displayName", "userType", "bio"],
            },
          },
          {
            model: User,
            as: "LessonStudent",
            attributes: ["id", "email", "displayName", "userType", "bio"],
          },
        ],
      });
      res.json(singleLesson);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.user.userType !== 1) {
      res.sendStatus(401);
    } else {
      const newLesson = await Lesson.create(req.body);
      res.status(201).json(newLesson);
    }
  } catch (err) {
    next(err);
  }
});
