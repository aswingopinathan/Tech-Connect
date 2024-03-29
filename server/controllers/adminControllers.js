const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const User = require("../models/userModel");


module.exports = { 

  authAdmin: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      if (admin && (await admin.matchPassword(password))) {
        res.json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
          pic: admin.pic,
          token: generateToken(admin._id),
        });
      } else {
        throw new Error("Invalid Email or Password!");
      }
    } catch (error) {
      console.log(error);
      res
        .json({
          error: "Invalid Email or Password!",
        })
        .status(500);
    }
  }),

  getUsers: asyncHandler(async (req, res) => {
    try {
      User.find({}).then((data) => {
        console.log("getUsers working");
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }),

  blockUser: asyncHandler(async (req, res) => {
    try {
      const { userId, block } = req.body;
      User.updateOne({_id:userId},{$set:{block:block}}).then((data) => {
        console.log("blockUser working");
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }),
 };
