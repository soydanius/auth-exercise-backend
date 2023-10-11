import express from "express";
import * as jwtController from "../controllers/jwtController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router
  .get("/signUp", jwtController.sendSignUpForm)
  .get("/login", jwtController.sendLoginForm)
  .get("/admin", verifyToken, (req, res) => {
    const username = req.decoded.username;
    res.send("Logged in as: " + username);
  })
  .post("/connect", jwtController.connect)
  .post("/checkJWT", jwtController.checkJWT)
  .post("/user", jwtController.createUser);

export default router;
