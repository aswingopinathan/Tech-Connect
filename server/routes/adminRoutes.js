const express = require("express");
const adminRouter = express.Router();
const {
  authAdmin,
  getUsers,
  blockUser,
} = require("../controllers/adminControllers");

adminRouter.post("/adminsignin", authAdmin);
adminRouter.get("/users", getUsers);
adminRouter.post("/blockuser", blockUser);

module.exports = adminRouter;
