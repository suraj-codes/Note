const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  addr: {
    type: String,
    required: true,
  },
});
module.exports = Note = new mongoose.model("note", noteSchema);
