const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  complete: { type: Boolean, required: true },
  index: { type: Number, required: true },
  due_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  todo_list: { type: Schema.Types.ObjectId, ref: "TodoList", required: true },
});

// Export model
module.exports = mongoose.model("Author", TodoItemSchema);
