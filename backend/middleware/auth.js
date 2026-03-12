function trainerCheck(req, res, next) {
  if (req.query.admin === "true") {
    next();
  } else {
    res.status(403).send("Access denied");
  }
}

//? = query parameter , = sign is value
