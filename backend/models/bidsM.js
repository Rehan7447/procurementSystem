const mongoose = require("mongoose");

const bidsSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },
  bidderEmail: {
    type: String,
    required: true,
    ref: "User",
  },
  bidderName: {
    type: String,
    required: true,
  },
  bidderAmount: {
    type: Number,
    required: true,
  },
  bidderDate: {
    type: Date,
    default: Date.now,
  },
});

const bidsM = mongoose.model("bids", bidsSchema);
module.exports = bidsM;
