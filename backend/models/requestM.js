const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    ref: "User",
  },
  department: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  acceptedBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bids",
    default: null,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bids",
    },
  ],
  default: [],
});

const procurementsM = mongoose.model("procurements", requestSchema);
module.exports = procurementsM;
