const express = require('express');
const { createChat, userChats, findChat, removeChat } = require('../controllers/ChatController');

const chatRouter = express.Router()

chatRouter.post("/",createChat)
chatRouter.post("/removechat",removeChat)

chatRouter.get("/:userId",userChats)
chatRouter.get("/find/:firstId/:secondId",findChat)



module.exports = chatRouter;    