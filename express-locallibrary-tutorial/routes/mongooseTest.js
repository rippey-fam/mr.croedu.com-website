const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB =
  "mongodb+srv://mr_croedu:kZBQ3ZqrIuAICC81@cluster0.jtgshdx.mongodb.net/local_library?appName=Cluster0";

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema

// Wait for database to connect, logging an error if there is a problem
router.get("/", async function (req, res, next) {
  try {
    await mongoose.connect(mongoDB);
    const Schema = mongoose.Schema;

    const TestModelSchema = new Schema({
      string: String,
      date: Date,
    });

    const SomeModel = mongoose.model("TestModel", TestModelSchema);
    const myData = new SomeModel({ string: "Today", date: Date.now() });

    await await res.render("mongooseTest", {
      data: [
        {
          Name: "Matthew Rippey",
          Age: 14,
          "Favorite Language": "JavaScript",
          "Favorite Food": "Sushi",
        },
        { "Connected to Mongoose?": "YES!" },
      ],
    });
  } catch (err) {
    res.render("mongooseTest", {
      data: [
        {
          Name: "Matthew Rippey",
          Age: 14,
          "Favorite Language": "JavaScript",
          "Favorite Food": "Sushi",
        },
        { "Connected to Mongoose?": "NO", Error: err },
      ],
    });
  }
});

module.exports = router;
