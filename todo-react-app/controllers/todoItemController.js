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
  const start = Date.now();
  console.log(
    `starting update... time diff ${Date.now() - req.body.startTime}ms`,
  );
  const todoItem = req.body.todoItem;
  const updatedFields = req.body.updatedFields;
  const filter = { _id: todoItem._id };
  try {
    await Todoitem.findOneAndUpdate(filter, updatedFields);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo item" });
  }
  console.log(`finished update ${Date.now() - start}ms`);
  res.sendStatus(200);
};

exports.todoitems_add = async (req, res) => {
  const start = Date.now();
  console.log(`starting add... time diff ${Date.now() - req.body.startTime}ms`);
  const todoItem = req.body.todoItem;
  delete todoItem._id; // Remove temp_id to let MongoDB generate a real one
  try {
    const newItem = new Todoitem(todoItem);
    console.log("starting save");
    console.log(todoItem);
    await newItem.save();
    console.log(`finished add ${Date.now() - start}ms`);
    res.json({ item: newItem });
  } catch (err) {
    console.log(`error: ${err}`);
    res.status(500).json({ error: "Failed to add todo item" });
  }
};

// serving our public built react page
exports.todo_list = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/todo/dist/index.html"));
};
