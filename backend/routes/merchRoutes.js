const express = require("express");
const router = express.Router();
const {
  createBid,
  getOwnBids,
  getAvailableRequests,
  getBidDetails,
} = require("../controllers/merchC");

router.post("/createBid", createBid);
router.get("/getOwnBids", getOwnBids);
router.get("/getAvailableRequests", getAvailableRequests);
router.get("/getBidDetails", getBidDetails);

module.exports = router;
