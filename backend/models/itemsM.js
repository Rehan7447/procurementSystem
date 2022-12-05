const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ItemM = mongoose.model("Item", itemSchema);
module.exports = ItemM;
