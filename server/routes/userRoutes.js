const express = require("express");
const { registerUser, authUser, verifyOtp, resendOtp, addPost, getPost, addLike, removeLike, addComment} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/tokenMiddleware")
const router=express.Router();

router.post('/signin',authUser);
router.post('/signup',registerUser);
router.post('/verifyotp',verifyOtp);
router.post('/resendotp',resendOtp);

router.post('/addpost',verifyToken,addPost)
router.get('/getpost',verifyToken,getPost)
router.post('/like',verifyToken,addLike)
router.post('/unlike',verifyToken,removeLike)
router.post('/addcomment',verifyToken,addComment)




module.exports=router;
  