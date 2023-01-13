const express = require("express");
const { registerUser, authUser,searchUser,
     verifyOtp, resendOtp, addPost, getPost,
      addLike, removeLike, addComment, removePost,
       reportPost, removeComment, editProfile, findUser,
        getUser, connectUser1,connectUser2, getSuggestions,
         picUpdate, editAbout,addExperience, addEducation,
         addSkills,notifyLike,disConnectUser1,disConnectUser2,
          findNotifications,clearNotification,notifyUnlike,
          notifyComment,notifyUncomment,getUniquePost,clearExp,
          clearEdu,clearSkill,getConnections,editPost} = require("../controllers/userControllers");
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

router.post('/disconnectuser',verifyToken,disConnectUser1,disConnectUser2)

router.post('/picupdate',verifyToken,picUpdate)

router.post('/editabout',verifyToken,editAbout)

router.post('/addexperience',verifyToken,addExperience)

router.post('/addeducation',verifyToken,addEducation)

router.post('/addskills',verifyToken,addSkills)

router.get('/search/:queryinput/:userId',verifyToken,searchUser)

router.post('/notifylike',verifyToken,notifyLike)

router.get('/findnotifications/:userid',findNotifications)

router.post('/clearnotify',verifyToken,clearNotification)

router.post('/notifyunlike',verifyToken,notifyUnlike)

router.post('/notifycomment',verifyToken,notifyComment)

router.post('/notifyuncomment',verifyToken,notifyUncomment)

router.get('/getpost/:postId',verifyToken,getUniquePost)

router.post('/clearexp',verifyToken,clearExp)

router.post('/clearedu',verifyToken,clearEdu)

router.post('/clearskill',verifyToken,clearSkill)

router.get('/getconnections/:id',verifyToken,getConnections)

router.post('/editpost',verifyToken,editPost)

module.exports=router; 
  