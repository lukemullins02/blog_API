const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const bearerToken = bearerHeader.split(" ")[1];

  if (!bearerToken) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(bearerToken, secret);
    req.user = verified;

    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = verifyToken;
