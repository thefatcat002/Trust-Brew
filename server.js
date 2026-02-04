const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Fake in-memory database
const users = [];

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// SIGNUP route
app.post("/signup", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect("/signup.html?error=password");
  }

  const usernameExists = users.find(user => user.username === username);
  if (usernameExists) {
    return res.redirect("/signup.html?error=username");
  }

  const emailExists = users.find(user => user.email === email);
  if (emailExists) {
    return res.redirect("/signup.html?error=email");
  }

  users.push({ username, email, password });

  console.log("USERS:", users);

  // Redirect to login after successful signup
  res.redirect("/login.html");
});

// LOGIN route (username OR email)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user =>
      (user.username === username || user.email === username) &&
      user.password === password
  );

  if (!user) {
    return res.redirect("/login.html?error=1");
  }

  res.redirect("/dashboard.html");

  app.post("/logout", (req, res) => {
  res.redirect("/login.html");
});

});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
