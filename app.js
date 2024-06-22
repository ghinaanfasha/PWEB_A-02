require('dotenv').config();
const { Sequelize } = require("sequelize");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require('./config/Database.js')

async function dbsync() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    // await db.sync({ force: true, alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbsync();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var dashboardRouter = require("./routes/dashboard");
var userhomeRouter = require("./routes/userhome");
var userprofilRouter = require("./routes/userprofil");
var admindaftarRouter = require("./routes/admindaftar");
var deskripsiadminRouter = require("./routes/deskripsiadmin");
var adminmagangRouter = require("./routes/adminmagang");
var admindeskripsiRouter = require("./routes/admindeskripsi");
var adminprofilRouter = require("./routes/adminprofil");
var adminscheduleRouter = require("./routes/adminschedule");
var adminmodulRouter = require("./routes/adminmodul");

// Backend
var adminBackend = require("./routes/backend/admin")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/userhome", userhomeRouter);
app.use("/userprofil", userprofilRouter);
app.use("/admindaftar", admindaftarRouter);
app.use("/deskripsiadmin", deskripsiadminRouter);
app.use("/adminmagang", adminmagangRouter);
app.use("/admindeskripsi", admindeskripsiRouter);
app.use("/adminprofil", adminprofilRouter);
app.use("/adminschedule", adminscheduleRouter);
app.use("/adminmodul", adminmodulRouter);

// Backend Route
app.use("/backend/admin", adminBackend)

app.use(express.static(path.join(__dirname, "./node_modules/preline/dist")));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
