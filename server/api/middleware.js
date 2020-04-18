function requireLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

const requireValidUser = (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) res.sendStatus(401);
  else next();
};

module.exports = { requireLoggedIn, requireValidUser };
