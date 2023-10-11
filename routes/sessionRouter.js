import express from "express";
import * as sessionController from "../controllers/sessionController.js";

const router = express.Router();

router
  .get("/login", sessionController.sendLoginForm)
  .post("/connect", sessionController.connect)
  .get("/admin", sessionController.admin)
  .get("/logout", sessionController.logout);

export default router;
