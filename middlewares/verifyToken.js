import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const { token } = req.body;

  if (token) {
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.redirect("login");
      } else {
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    });
  } else {
    res.redirect("login");
  }
};

export default verifyToken;
