import express from "express";
import cors from "cors";
import session from "express-session";
import sessionRouter from "./routes/sessionRouter.js";
import jwtRouter from "./routes/jwtRouter.js";
import "./db/server.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use("/session", sessionRouter);
app.use("/jwt", jwtRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
