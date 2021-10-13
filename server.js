const path = require('path');
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
mongoose.connect("mongodb+srv://pdxKxETAFcfN1lDF:pdxKxETAFcfN1lDF@cluster0.5bzqy.mongodb.net/workout" || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  