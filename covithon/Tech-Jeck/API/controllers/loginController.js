const jwt = require("jsonwebtoken");
const moment = require("moment");

const db = require("../models/index")

module.exports.ping = async (req, res) => {
  res.send({
    data: {
      message: "API server running"
    },
  });
}; 

module.exports.login = async (req, res) => {
  
  let result;
  await db.Users.findOne(
    {
      where: { email: req.body.email, pwd: req.body.password },
      attributes: ['id', 'role','org_id']
    })
    .then(function (userData) {
      result = userData;
    })
    .catch(() => {
      result = "error";
    });
    
  if(result && result != "error"){
    let jwtToken = jwt.sign(
      {
        role: result.role,
        userId: result.id,
        orgId: result.org_id
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME
      }
    );

    res.send({
      data:{token: jwtToken}
    });    
  }
  else{
    res.status(401).send({
      error: {
        message: "Invalid Credentials"
      },
    });
  }  
}; 
