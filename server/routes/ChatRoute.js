const express = require('express');
const { createChat, userChats, findChat } = require('../controllers/ChatController');

const chatRouter = express.Router()

chatRouter.post("/",createChat)
chatRouter.get("/:userId",userChats)
chatRouter.get("/find/:firstId/:secondId",findChat)


module.exports = chatRouter;