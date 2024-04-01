const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/user.model');
const crudRoute = require("./routes/crud.route");
const app = express();

const url = process.env.CONNECTION_URL;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/users", crudRoute);

app.get("/", (req, res) => {
  res.send("Hi");
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