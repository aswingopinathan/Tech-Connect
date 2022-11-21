const express=require('express');
const adminRouter=express.Router();
const {authAdmin}= require('../controllers/adminControllers')

adminRouter.post('/adminsignin',authAdmin);


module.exports=adminRouter;  