const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decoded = jwt.verify(token, "welcometothethunderdome");
    const user = await User.find({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    console.log("middleware done")
    next();
  } catch (e) {
    res.status(401).send("Endpoint requires authentication" );
  }
};

module.exports = auth;
