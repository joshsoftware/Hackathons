const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).send({
      error: {
        message: "unauthorised user",
      },
    });
  } 
  else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(401).send({
            error: {
            message: "unauthorised user",
          },
        });
      } 
      else {
        next()
      }    
    });
  }
};

module.exports.decodeToken = (authHeader) => {
  const token = authHeader && authHeader.split(" ")[1];
  let decode = jwt.decode(token);
  const tokenData = {
    userId: decode.userId,
    role: decode.role,
    orgId: decode.orgId,
  };
  return tokenData;
};