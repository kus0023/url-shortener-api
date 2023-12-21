const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(403).json({
      message: "Please provide token in authorization header",
    });
  }

  const jsonToken = bearerToken.split(" ")[1];

  try {
    const result = jwt.verify(jsonToken, process.env.JWT_SECRET);

    res.user = result.payload;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token is Expired. Please provide valid token",
    });
  }
}

module.exports = authenticate;
