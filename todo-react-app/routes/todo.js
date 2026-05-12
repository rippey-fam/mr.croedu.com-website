const express = require("express");
const router = express.Router();
const path = require("path");
const todoController = require("../controllers/todoItemController");

/* GET home page. */

router.get("/api/todos", todoController.todoitems);

// Serve React router at /todo - all routes serve index.html for client-side routing
router.get("/", todoController.todo_list);
router.put("/api/todos", todoController.todoitems_update);
router.post("/api/todos", todoController.todoitems_add);
// anything else
router.get("/{*path}", todoController.todo_list);

module.exports = router;
