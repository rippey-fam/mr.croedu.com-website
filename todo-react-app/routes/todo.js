var express = require("express");
var router = express.Router();
const path = require("path");
const todoController = require("../controllers/todoItemController");

/* GET home page. */

router.get("/api/todos", todoController.todoitems);

// Serve React router at /todo - all routes serve index.html for client-side routing
router.get("/", todoController.todo_list);
router.get(/^\/(\/.*)?$/, todoController.todo_list);
router.put("/api/todos", todoController.todoitems_update);

module.exports = router;
