const ChatModel = require("../models/ChatModel");
const asyncHandler = require("express-async-handler");


module.exports = {
    createChat : asyncHandler(async(req,res)=>{
        const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId]
        });
        try {
            const result = await newChat.save()
            console.log('chat creation successfull');
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }),

    userChats : asyncHandler(async(req,res)=>{
        try {
            const chat = await ChatModel.find({
                members: {$in: [req.params.userId]}
            })
            console.log('chat',chat);
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    }), 

    findChat : asyncHandler(async(req,res)=>{
        try {
            const chat = await ChatModel.findOne({
                members: {$all: [req.params.firstId, req.params.secondId]}
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    }),

    removeChat : asyncHandler(async(req,res)=>{
        try {
            const chat = await ChatModel.deleteOne({
            members: [req.body.senderId, req.body.receiverId]
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    })
}