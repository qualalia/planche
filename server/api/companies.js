const router = require("express").Router();
const { Company, User, CircusClass, Lesson } = require("../db/models");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const companies = await Company.findAll({
      include: [{ model: User }, { model: CircusClass }, { model: Lesson }],
      order: [["name", "ASC"]],
    });
    if (companies.length) res.json(companies);
    else res.status(204).json(companies);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (typeof parseInt(req.params.id) !== "number") res.sendStatus(404);
    else {
      const company = await Company.findByPk(req.params.id, {
        include: [{ model: User }, { model: CircusClass }],
        order: [["name", "ASC"]],
      });
      if (company.name) res.json(company);
      else res.status(204).json(company);
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
