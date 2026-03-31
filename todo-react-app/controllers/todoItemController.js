var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Todoitem = require("../models/todoItem");
const Todolist = require("../models/todoList");

// Serving data (to be replaced with mongoose fetches) cross-site to our React App
exports.todoitems = async (req, res) => {
  const listQuery = await Todolist.find({ title: "All todos" }, "_id").exec();
  const list = listQuery[0]._id;
  const allTodoItems = await Todoitem.find({ todo_list: list })
    .sort({ complete: 1, due_date: -1, created_at: -1 })
    .populate("todo_list")
    .exec();
  res.json(allTodoItems);
};

/*
req object
{
    todoItem (the todoItem that needs to be updated)
    updatedFields (e.g. {checked: true, name: "New Name"})
}
*/
exports.todoitems_update = async (req, res) => {
  console.log("starting update...");
  const todoItem = req.body.todoItem;
  const updatedFields = req.body.updatedFields;
  const filter = { _id: todoItem._id };
  await Todoitem.findOneAndUpdate(filter, updatedFields);
  console.log("finished update");
};

// serving our public built react page
exports.todo_list = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/todo/dist/index.html"));
};
