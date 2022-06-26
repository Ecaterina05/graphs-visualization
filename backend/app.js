const path = require("path")
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const usersRoutes = require("./users");

const app = express();

// mongodb+srv://ecaterina:12q12q@cluster0.p9ros.mongodb.net/node-angular?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://ecaterinab:23w23w@ecaterinacluster.3slkd.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error(`Error connecting to database! \n${err}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/users", usersRoutes);

module.exports = app;
