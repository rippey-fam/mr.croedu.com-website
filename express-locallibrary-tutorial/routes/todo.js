const express = require("express");
const router = express.Router();

router.get("/:tasks", (req, res) => {
  let tasks = req.params.tasks.split(",");
  // take away extra spaces
  tasks = tasks.map((task) => task.trim());
  res.render("todo", { tasks });
});

module.exports = router;
