const express = require("express");
const adminC = require("../controllers/adminC.js");

const router = express.Router();

router.get("/getAllRequests", adminC.getAllRequests);
router.get("/getAllUsers", adminC.getAllUsers);
router.post("/createUser", adminC.createUser);
router.put("/editRequest", adminC.editRequest);
router.delete("/deleteUser", adminC.deleteUser);
router.put("/updateUser", adminC.editUser);
router.post("/createItem", adminC.setItems);
router.get("/getAllItems", adminC.getItems);
router.delete("/deleteItem", adminC.deleteItem);

module.exports = router;
