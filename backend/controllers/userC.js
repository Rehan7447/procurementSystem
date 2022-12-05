const asyncHandler = require("express-async-handler");
const UserM = require("../models/usersM.js");
const ProcurementsM = require("../models/requestM.js");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      department: user.department,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const makeRequest = asyncHandler(async (req, res) => {
  const { email, department, name, desc, amount } = req.body;
  let status = "Pending";
  const request = await ProcurementsM.create({
    userEmail: email,
    department,
    name,
    desc,
    amount,
    status,
  });
  if (request) {
    res.json(request);
  } else {
    res.status(401);
    throw new Error("Invalid request");
  }
});

const getOwnRequests = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const userId = await UserM.findOne({ email });
  if (userId) {
    const requests = await ProcurementsM.find({ userEmail: email });
    if (requests) {
      res.json(requests);
    } else {
      res.status(401);
      throw new Error("Requests not found");
    }
  }
});

const getRequestDetails = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const request = await ProcurementsM.findById(id);
  if (request) {
    res.json(request);
  } else {
    res.status(401);
    throw new Error("Request not found");
  }
});

module.exports = { login, makeRequest, getOwnRequests, getRequestDetails };
