var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Todoitem = require("../models/todoItem");
const Todolist = require("../models/todoList");

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
    title: "Schedule dentist routerointment",
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
// Serving data (to be replaced with mongoose fetches) cross-site to our React App
exports.todoitems = async (req, res) => {
  const allTodoItems = await Todoitem.find()
    .sort({ complete: 1 })
    .populate("todo_list")
    .exec();
  res.json(allTodoItems);
};

// serving our public built react page
exports.todo_list = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/todo/dist/index.html"));
};
