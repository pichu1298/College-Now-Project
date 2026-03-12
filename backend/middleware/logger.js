function logger(req, res, next) {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} ${req.method} ${req.url}`);

  next(); //when this is done, move to response
}

module.exports = logger;
