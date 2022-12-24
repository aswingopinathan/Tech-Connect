const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    userid: {
      type: String,
    },

    notifications:[{
      likeduserid:{
        type: String,
      },
      commenteduserid:{
        type: String,
      },
      likedpostid:{
        type: String,
      },
      commentedpostid:{
        type: String,
      },
      message:{
        type: String,
      },
    }]
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
