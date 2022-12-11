const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
// const { Schema } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
let otp;

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, mobile, pic } = req.body;

      const userExists = await User.findOne({ email });
      // if (userExists) {
      //   console.log("userexist");
      //   return res.json({ error: "User Already Exists" });
      //   // throw new Error("User Already Exists");
      // }

      otp = Math.floor(1000 + Math.random() * 9000);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASS_WORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.USER_NAME,
        to: email,
        subject: "Tech Connect OTP",
        text: `Your one time password is ${otp}`,
      });

      res.json(req.body);
    } catch (error) {
      console.log(error);
    }
  }),

  authUser: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          pic: user.pic,
          token: generateToken(user._id),
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
        .status(400);
    }
  }),

  verifyOtp: asyncHandler(async (req, res) => {
    // console.log("verify point working");
    // console.log(otp);
    // console.log(req.body.otp);
    // console.log(req.body.userData);
    try {
      if (otp == req.body.otp) {
        console.log("otp verified");

        const { name, email, password, mobile, pic } = req.body.userData;

        const user = await User.create({
          name,
          email,
          password,
          mobile,
          pic,
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            pic: user.pic,
            token: generateToken(user._id),
          });
        }
      } else {
        res.status(400);
      }
    } catch (error) {
      console.log(error);
    }
  }),

  resendOtp: asyncHandler(async (req, res) => {
    console.log("resend working");
    try {
      const { email } = req.body;
      console.log(req.body.email);

      otp = Math.floor(1000 + Math.random() * 9000);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASS_WORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.USER_NAME,
        to: email,
        subject: "Tech Connect OTP",
        text: `Your one time password is ${otp}`,
      });
    } catch (error) {
      console.log(error);
    }
    // res.json(req.body)
  }),

  addPost: asyncHandler(async (req, res) => {
    // console.log("add post");
    // console.log(req.headers);
    try {
      const { pic, description, video, name, userId } = req.body;
      // console.log(name);
      // console.log(userId);
      userPost = {
        name: "",
        userId: "",
        description: "",
        image: "",
        video: "",
        likes: [],
        comments: [],
        date: "",
      };

      if (pic) {
        userPost.name = name;
        userPost.userId = userId;
        userPost.description = description;
        userPost.date = new Date().toDateString();
        userPost.timeStamp = new Date();
        userPost.image = pic;

        const post = await Post(userPost).save();
      }

      if (video) {
        userPost.name = name;
        userPost.userId = userId;
        userPost.description = description;
        userPost.date = new Date().toDateString();
        userPost.timeStamp = new Date();
        userPost.video = video;

        const post = await Post(userPost).save();
      }
      res.json(req.body);
    } catch (error) {
      console.log(error);
    }
  }),

  getPost: asyncHandler(async (req, res) => {
    // console.log("get post");
    try {
      Post.find({})
        .populate("userId")
        .then((data) => {
          // console.log(data);
          res.status(200).json(data.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  }),

  addLike: asyncHandler(async (req, res) => {
    // console.log("addlike working");
    // console.log(req.headers);
    try {
      const { postId, userId } = req.body;
      Post.updateOne({ _id: postId }, { $push: { likes: userId } }).then(
        (data) => {
          console.log("addlike working");
          console.log(data);
          res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }),

  removeLike: asyncHandler(async (req, res) => {
    // console.log("removeLike working");
    try {
      const { postId, userId } = req.body;
      Post.updateOne({ _id: postId }, { $pull: { likes: userId } }).then(
        (data) => {
          console.log("removeLike working");
          // console.log(data);
          res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }),

  addComment: asyncHandler(async (req, res) => {
    console.log("addcomment working");
    // console.log(req.headers);

    try {
      const { postId, userId, comment, name, pic } = req.body;
      console.log("postId", postId);
      console.log("userId", userId);
      console.log("comment", comment);
      console.log("name", name);
      console.log("pic", pic);

      Post.updateOne(
        { _id: postId },
        { $push: { comments: { userId, comment, name, pic } } }
      ).then((data) => {
        console.log("addcomment db  working");
        console.log("data", data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }),

  removePost: asyncHandler(async (req, res) => {
    console.log("removePost working");
    try {
      const { postId } = req.body;
      Post.remove({ _id: postId }).then((data) => {
        console.log("removePost working");
        // console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }),

  reportPost: asyncHandler(async (req, res) => {
    // console.log("reportPost working");
    try {
      const { postId, userId } = req.body;
      Post.updateOne({ _id: postId }, { $push: { report: userId } }).then(
        (data) => {
          console.log("reportPost working");
          console.log(data);
          res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }),

  removeComment: asyncHandler(async (req, res) => {
    // console.log("removeComment working");
    try {
      const { postId, userId, commentId } = req.body;
      console.log('commentId',commentId);
      Post.updateOne(
        { _id: postId, "comments._id": { $eq: new ObjectId(commentId) } },
        { $pull: { comments: { _id: new ObjectId(commentId) } } }
      ).then((data) => {
        console.log("removeComment working");
        // console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }),

  editProfile: asyncHandler(async (req, res) => {
    // console.log("editProfile working");
    try {
      const { userId, name, jobstatus, currentposition, place } = req.body;
      User.updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            jobStatus: jobstatus,
            jobPosition: currentposition,
            place: place,
          },
        }
      ).then((data) => {
        console.log("userId", userId);
        console.log("name", name);
        console.log("jobstatus", jobstatus);
        console.log("editProfile working");
        console.log("currentposition", currentposition);
        console.log("place", place);
        // console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }),

  findUser: asyncHandler(async (req, res) => {
    console.log("findUser working");

    try {
      const userId = req.query.userId;
      // const userId = this.$route.params.userId
      console.log("userId", userId);
      User.find({ _id: userId }).then((data) => {
        console.log("findUser working");
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }),

  getUser: asyncHandler(async (req, res) => {
    console.log("getUser working");

    try {
      const userId = req.params.id;
      // const userId = this.$route.params.userId
      console.log("userId", userId);
      User.find({ _id: userId }).then((data) => {
        console.log("getUser working");
         [data] = data;
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {  
      console.log(error);
    }
  }),
  
};
