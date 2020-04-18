const router = require("express").Router();
const { Lesson, CircusClass, User } = require("../db/models");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allClasses = await CircusClass.findAll({
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "displayName", "userType", "bio"],
        },
        {
          model: User,
          attributes: ["id", "email", "displayName", "userType"],
        },
      ],
    });
    res.json(allClasses);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (typeof parseInt(req.params.id) !== "number") res.sendStatus(404);
    else {
      const singleClass = await CircusClass.findByPk(req.params.id, {
        include: {
          model: User,
          as: "instructor",
          attributes: ["id", "displayName", "userType", "bio"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "email", "displayName", "userType"],
          },
        ],
      });
      res.json({ singleClass });
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
      const newClass = await CircusClass.create(req.body);
      res.status(201).json(newClass);
    }
  } catch (err) {
    next(err);
  }
});
