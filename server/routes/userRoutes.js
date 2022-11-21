const express = require("express");
const { registerUser, authUser} = require("../controllers/userControllers");
// const { verifyToken } = require("../middlewares/tokenMiddleware")
const router=express.Router();

router.post('/signin',authUser);
router.post('/signup',registerUser);


module.exports=router;
 