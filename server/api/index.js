const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/classes", require("./circus-classes.js"));
router.use("/lessons", require("./lessons.js"));
router.use("/companies", require("./companies.js"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
