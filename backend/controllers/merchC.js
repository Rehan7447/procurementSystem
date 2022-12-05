const asyncHandler = require("express-async-handler");
const bidM = require("../models/bidsM");
const requestM = require("../models/requestM");

const createBid = asyncHandler(async (req, res) => {
  const { email, name, amount, requestId } = req.body;
  console.log(req.body);
  const bid = await bidM.create({
    bidderEmail: email,
    bidderName: name,
    bidderAmount: amount,
    request: requestId,
  });
  if (bid) {
    const request = await requestM.findById(requestId);
    if (request) {
      if (amount < 5000) {
        request.status = "Completed";
        request.acceptedBid = bid._id;
      }
      request.bids.push(bid._id);
      request.save();
      res.json(bid);
    } else {
      res.status(401);
      throw new Error("Invalid request");
    }
  } else {
    res.status(401);
    throw new Error("Invalid bid");
  }
});

const getOwnBids = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const bids = await bidM.find({ bidderEmail: email });
  if (bids) {
    res.json(bids);
  } else {
    res.status(401);
    throw new Error("Bids not found");
  }
});

// get requests that are avilable for biddding
const getAvailableRequests = asyncHandler(async (req, res) => {
  requestM.find({ status: "Pending" }, (err, requests) => {
    if (err) {
      res.status(401);
      throw new Error("Requests not found");
    } else {
      res.json(requests);
    }
  });
});

const getBidDetails = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const bid = await bidM.findById(id);
  if (bid) {
    res.json(bid);
  } else {
    res.status(401);
    throw new Error("Bid not found");
  }
});

module.exports = { createBid, getOwnBids, getAvailableRequests, getBidDetails };
