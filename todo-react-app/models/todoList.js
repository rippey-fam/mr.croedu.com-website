const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
});

// Export model
module.exports = mongoose.model("TodoList", TodoListSchema);
