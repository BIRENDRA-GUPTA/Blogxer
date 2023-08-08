const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ status: "error", message: "you must logged in" });
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err)
        return res.status(401).json({ status: "error", message: err.message });
      const { _id } = payload;
      User.findById(_id)
        .then((user) => {
          if (!user) {
            res.json({ message: "No user found" });
          }
          (req.user = user), next();
        })
        .catch((err) =>
          res.json({ message: err.message, error: "user not found" })
        );
    });
  } catch (error) {
    return res.status(403).json({ message: error.message, status: "error" });
  }
};

module.exports = verifyToken;
