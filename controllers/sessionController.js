export const sendLoginForm = (req, res) => {
  const htmlForm = `
      <form action="/session/connect" method="post">
          <label for="login">Login:</label>
          <input type="text" id="login" name="login" required><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br>
          <input type="submit" value="Login">
       </form>`;

  res.send(htmlForm);
};

export const connect = (req, res) => {
  const { login, password } = req.body;

  // Check login credentials
  if (login === "john" && password === "doe") {
    req.session.isConnected = true;
    res.redirect("admin");
  } else {
    res.redirect("login");
  }
};

export const admin = (req, res) => {
  if (req.session.isConnected) {
    res.send("Admin Page (Logged in)");
  } else {
    res.redirect("login");
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("login");
};
