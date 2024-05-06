const express = require("express");
const mongoose = require("mongoose");
const { User, createIndex, searchUsers } = require("./models/user.model.js");
const crudRoute = require("./routes/crud.route");
const profileRoute = require("./routes/profile.route");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const url = process.env.CONNECTION_URL;
const jwt_secret = process.env.JWT_SECRET;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  try {
    const user = User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (user.account_type === "admin") {
      // User is admin, proceed to the next middleware
      next();
    } else {
      // User is not admin, send unauthorized error
      res.status(401).json({ message: "Unauthorized: User is not an admin" });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

app.use("/dashboard/users", authenticateToken, isAdmin, crudRoute);
app.use("/profile", authenticateToken, profileRoute);

app.get("/", (req, res) => {
  res.send("CV Hunter API");
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.bmr0jim.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is on 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        // If token doesn't exist, generate a new one
        const newToken = jwt.sign({ userId: user._id }, jwt_secret, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "Login successful", token: newToken });
      } else {
        // If token exists, user is already logged in
        return res.status(200).json({ message: "Already logged in!" });
      }
    } else {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        account_type: "user",
      });

      await newUser.save();

      // If no Authorization header, generate a new token
      const token = jwt.sign({ userId: newUser._id }, jwt_secret, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User registered successfully", token });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        // If token doesn't exist, generate a new one
        const newToken = jwt.sign({ userId: user._id }, jwt_secret, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "Login successful", token: newToken });
      } else {
        // If token exists, user is already logged in
        return res.status(200).json({ message: "Already logged in!" });
      }
    } else {
      // If no Authorization header, generate a new token
      const newToken = jwt.sign({ userId: user._id }, jwt_secret, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ message: "Login successful", token: newToken });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
