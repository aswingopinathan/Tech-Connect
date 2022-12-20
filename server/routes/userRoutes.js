const express = require("express");
const { registerUser, authUser, verifyOtp, resendOtp, addPost, getPost, addLike, removeLike, addComment, removePost, reportPost, removeComment, editProfile, findUser, getUser, connectUser1,connectUser2, getSuggestions, picUpdate, editAbout,editExperience, editEducation, editSkills} = require("../controllers/userControllers");
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

router.post('/removepost',verifyToken,removePost)

router.post('/reportpost',verifyToken,reportPost)

router.post('/removecomment',verifyToken,removeComment)

router.post('/editprofile',verifyToken,editProfile)

router.get('/finduser',verifyToken,findUser)

router.get('/user/:id',verifyToken,getUser)

router.get('/getsuggestions/:id',verifyToken,getSuggestions)

router.post('/connectuser',verifyToken,connectUser1,connectUser2)

router.post('/picupdate',verifyToken,picUpdate)

router.post('/editabout',verifyToken,editAbout)

router.post('/editexperience',verifyToken,editExperience)

router.post('/editeducation',verifyToken,editEducation)

router.post('/editskills',verifyToken,editSkills)
 
module.exports=router; 
  