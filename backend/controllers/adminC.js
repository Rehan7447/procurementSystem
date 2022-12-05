const asyncHandler = require("express-async-handler");
const UserM = require("../models/usersM.js");
const ProcurementsM = require("../models/requestM.js");
const itemM = require("../models/itemsM.js");

const editRequest = asyncHandler(async (req, res) => {
  const { id, status, accepted } = req.body;
  const request = await ProcurementsM.findById(id);
  if (request) {
    request.status = status;
    request.acceptedBid = accepted;
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } else {
    res.status(401);
    throw new Error("Request not found");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, department, isAdmin } = req.body;
  const userExists = await UserM.findOne({ email });
  if (userExists) {
    res.status(400);
    res.json("User already exists");
  }
  const user = await UserM.create({
    name,
    email,
    password,
    department,
    isAdmin,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      department: user.department,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await ProcurementsM.find({});
  if (requests) {
    res.json(requests);
  } else {
    res.status(401);
    throw new Error("Requests not found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserM.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await UserM.findById(id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const editUser = asyncHandler(async (req, res) => {
  const { id, name, email, department, isAdmin } = req.body;
  const user = await UserM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    user.department = department;
    user.isAdmin = isAdmin;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const getItems = asyncHandler(async (req, res) => {
  const items = await itemM.find({});
  if (items) {
    res.json(items);
  } else {
    res.status(401);
    throw new Error("Items not found");
  }
});

const setItems = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const item = await itemM.create({
    name,
  });
  if (item) {
    res.status(201).json({
      _id: item._id,
      name: item.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid item data");
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const item = await itemM.findById(id);
  if (item) {
    await item.remove();
    res.json({ message: "Item deleted" });
  } else {
    res.status(401);
    throw new Error("Item not found");
  }
});

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  editUser,
  getAllRequests,
  editRequest,
  getItems,
  setItems,
  deleteItem,
};
