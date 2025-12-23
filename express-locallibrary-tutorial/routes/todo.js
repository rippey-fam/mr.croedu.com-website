const express = require("express");
const router = express.Router();

router.get("/:tasks", (req, res) => {
  let tasks = req.params.tasks.split(", ");
  res.render("todo", { tasks });
});

module.exports = router;
