const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log("JWT ERROR NAME:", err.name);
    console.log("JWT ERROR MESSAGE:", err.message);

    return res.status(401).json({
      error: err.name,
      message: err.message,
    });
  }
}

module.exports = verifyToken;
