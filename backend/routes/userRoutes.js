const express = require("express");
const userC = require("../controllers/userC.js");

const router = express.Router();

router.post("/login", userC.login);
router.post("/makeRequest", userC.makeRequest);
router.get("/getOwnRequests", userC.getOwnRequests);
router.get("/getRequestDetails", userC.getRequestDetails);

module.exports = router;
