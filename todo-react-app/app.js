var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

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

const startState = [
  {
    title: "Buy groceries",
    complete: false,
    id: 0,
  },
  {
    title: "Walk the dog",
    complete: true,
    id: 1,
  },
  {
    title: "Finish project report",
    complete: false,
    id: 2,
  },
  {
    title: "Call mom",
    complete: true,
    id: 3,
  },
  {
    title: "Schedule dentist appointment",
    complete: false,
    id: 4,
  },
  {
    title: "Pay electricity bill",
    complete: false,
    id: 5,
  },
  {
    title: "Clean the kitchen",
    complete: true,
    id: 6,
  },
  {
    title: "Update resume",
    complete: false,
    id: 7,
  },
  {
    title: "Reply to emails",
    complete: true,
    id: 8,
  },
  {
    title: "Book flight tickets",
    complete: false,
    id: 9,
  },
  {
    title: "Read chapter 5",
    complete: false,
    id: 10,
  },
  {
    title: "Water the plants",
    complete: true,
    id: 11,
  },
  {
    title: "Prepare presentation slides",
    complete: false,
    id: 12,
  },
  {
    title: "Fix leaky faucet",
    complete: false,
    id: 13,
  },
  {
    title: "Organize desk",
    complete: true,
    id: 14,
  },
  {
    title: "Backup computer files",
    complete: false,
    id: 15,
  },
  {
    title: "Return library books",
    complete: false,
    id: 16,
  },
  {
    title: "Cancel old subscription",
    complete: true,
    id: 17,
  },
  {
    title: "Buy birthday gift",
    complete: false,
    id: 18,
  },
  {
    title: "Meal prep for the week",
    complete: false,
    id: 19,
  },
];

app.get("/api/todos", (req, res) => {
  res.json(startState);
});

// Serve static assets for React app at /todo
app.use("/todo", express.static(path.join(__dirname, "public/todo/dist")));

// Serve React app at /todo - all routes serve index.html for client-side routing
app.get("/todo", (req, res) => {
  res.sendFile(path.join(__dirname, "public/todo/dist/index.html"));
});

// app.get("/todo/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/todo/dist/index.html"));
// });
app.get(/^\/todo(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public/todo/dist/index.html"));
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
