exports.login = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.json(`${username} is logged in`);
};
