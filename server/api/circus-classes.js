const router = require("express").Router();
const { CircusClass, User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allClasses = await CircusClass.findAll({
      include: "instructor",
    });
    res.json(allClasses);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleClass = await CircusClass.findByPk(req.params.id, {
      include: "instructor",
      include: [User],
    });
    res.json(singleClass);
  } catch (err) {
    next(err);
  }
});
