const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("mongooseTest", {
    data: [
      {
        Name: "Matthew Rippey",
        Age: 14,
        "Favorite Language": "JavaScript",
        "Favorite Food": "Sushi",
      },
    ],
  });
});

module.exports = router;
