import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const sendSignUpForm = async (req, res) => {
  const signUpForm = `
        <form action="/jwt/user" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <input type="submit" value="Sign Up">
         </form>`;

  res.send(signUpForm);
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
      throw new Error("User already exists.");
    }
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    if (newUser) {
      res.redirect("login");
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendLoginForm = async (req, res) => {
  const loginForm = `
        <form action="/jwt/connect" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <input type="submit" value="Login">
         </form>`;

  res.send(loginForm);
};

export const connect = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) throw new Error("User does not exist");
    console.log(foundUser);

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new Error("Password is incorrect");

    const token = jwt.sign(
      { uid: foundUser._id, username: foundUser.username },
      process.env.JWT_SECRET
    );
    res.send(token);
  } catch (error) {
    console.log(error);
  }
};

export const checkJWT = async (req, res) => {
  const { admin } = req.decoded;

  // Check the decoded payload (e.g., admin: true)
  if (admin) {
    // Redirect to the admin page
    res.redirect("admin");
  } else {
    res.redirect("login");
  }
};
