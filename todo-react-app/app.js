var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const todoRouter = require("./routes/todo");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// gonna use React and HTML
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Serve static assets for React app at /todo
app.use("/todo", express.static(path.join(__dirname, "/public/todo/dist")));

app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.redirect("/todo");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`error: ${res.locals.error.stack}`);
});

module.exports = app;
