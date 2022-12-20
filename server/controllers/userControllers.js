const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
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
      res.status(500).json(error)
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
        .status(500);
    }
  }),

  verifyOtp: asyncHandler(async (req, res) => {
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
      res.status(500).json(error)
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
      res.status(500).json(error)
    }
  }),

  addPost: asyncHandler(async (req, res) => {
    
    try {
      const { pic, description, video, name, userId } = req.body;
      
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
      res.status(500).json(error)
    }
  }),

  getPost: asyncHandler(async (req, res) => {
    try {
      Post.find({})
        .populate("userId")
        .then((data) => {
          res.status(200).json(data.reverse());
        });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  addLike: asyncHandler(async (req, res) => {
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
      res.status(500).json(error)
    }
  }),

  removeLike: asyncHandler(async (req, res) => {
    try {
      const { postId, userId } = req.body;
      Post.updateOne({ _id: postId }, { $pull: { likes: userId } }).then(
        (data) => {
          res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  addComment: asyncHandler(async (req, res) => {

    try {
      const { postId, userId, comment, name, pic } = req.body;
      
      date = new Date();

      Post.updateOne(
        { _id: postId },
        { $push: { comments: { userId, comment, name, pic ,date} } }
      ).then((data) => {
        console.log("addcomment db  working");
        console.log("data", data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
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
      res.status(500).json(error)
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
      res.status(500).json(error)
    }
  }),

  // removeComment: asyncHandler(async (req, res) => {
  //   console.log("removeComment working");
  //   try {
  //     const { postId, userId, commentId } = req.body;
  //     console.log('commentId',commentId);
  //     Post.updateOne(
  //       { _id: postId, "comments._id": { $eq: new ObjectId(commentId) } },
  //       { $pull: { comments: { _id: new ObjectId(commentId) } } }
  //     ).then((data) => {
  //       console.log("removeComment working");
  //       // console.log(data);
  //       res.status(200).json(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json(error)
  //   }
  // }),

  removeComment: asyncHandler(async (req, res) => {
    console.log("removeComment1 working");
    try {
      const { postId, userId, commentId } = req.body;
      console.log('commentId',commentId);
      Post.updateOne(
        { _id: postId , "comments.userId":{$eq:userId} },{ $pull: { comments: { _id: commentId} } }
      ).then((data) => {
        console.log("removeComment2 working");
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  editProfile: asyncHandler(async (req, res) => {
    try {
      const { userId, name, jobstatus, currentposition, place } = req.body;
      
      if(ObjectId.isValid(userId)){
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
          res.status(200).json(data);
        });
      }else{
        throw new Error("invalid userid")
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  findUser: asyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;
      User.find({ _id: userId }).then((data) => {
        console.log("findUser working");
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  getUser: asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      User.find({ _id: userId }).then((data) => {
        console.log("getUser working");
         [data] = data;
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {  
      console.log(error);
      res.status(500).json(error)
    }
  }),

  getSuggestions: asyncHandler(async (req, res) => {
let userId = req.params.id
    try {
      User.find({_id:{$ne:userId}}).then((data) => {
        res.status(200).json(data);
      });
    } catch (error) {  
      console.log(error);
      res.status(500).json(error)
    }
  }),

  connectUser1: asyncHandler(async (req, res,next) => {
    try {
      const { userId, connectUserId } = req.body;
      User.updateOne({ _id: userId }, { $push: { connectionIds: connectUserId } })
      .then(
        (data) => {
          console.log("connectUser1 working");
          console.log(data);
          next()
          // res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  connectUser2: asyncHandler(async (req, res) => {
    try {
      const { userId, connectUserId } = req.body;
      User.updateOne({ _id: connectUserId }, { $push: { connectionIds: userId } }) 
      .then(
        (data) => {
          console.log("connectUser2 working");
          console.log(data);
          res.status(200).json(data);
        }
      ); 
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),
  
  picUpdate: asyncHandler(async (req, res) => {
    try {
      const { userId, pic } = req.body;
      User.updateOne({ _id: userId }, {$set:{ pic: pic}} ).then(
        (data) => {
          res.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  editAbout: asyncHandler(async (req, res) => {
    try {
      const { userId,about } = req.body;
      User.updateOne(
        { _id: userId },
        {
          $set: {
            about: about,
          },
        } 
      ).then((data) => {
        console.log('editAbout successfull');
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  editExperience: asyncHandler(async (req, res) => {
    try {
      const { userId,experience } = req.body;
      User.updateOne(
        { _id: userId },
        {
          $set: {
            experience: experience,
          },
        } 
      ).then((data) => {
        console.log('editExperience successfull');
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  editEducation: asyncHandler(async (req, res) => {
    try {
      const { userId,education } = req.body;
      User.updateOne(
        { _id: userId },
        {
          $set: {
            education: education,
          },
        } 
      ).then((data) => {
        console.log('editEducation successfull');
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),

  editSkills: asyncHandler(async (req, res) => {
    try {
      const { userId,skills } = req.body;
      User.updateOne(
        { _id: userId },
        {
          $set: {
            skills: skills,
          },
        } 
      ).then((data) => {
        console.log('editSkills successfull');
        res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }),
};
