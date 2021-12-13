const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ error: "Access denied!" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err) {
      res.status(403).json({ error: "Unauthorize!" });
    }
  }
};
