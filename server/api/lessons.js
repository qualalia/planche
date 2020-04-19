const router = require("express").Router();
const { Lesson, CircusClass, User } = require("../db/models");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allLessons = await Lesson.findAll({
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
      order: ["startTime"],
      //      limit: 2,
    });
    res.json(allLessons);
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
