const verifyToken = (req,res,next)=>{
    let authHeader = req.header.authorization;
    if(authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,function(err){
        if(err){
            res.status(500).send({error:"Authentication failed"})
        }
        else{
            next();
        }
    })
    
};

module.exports = {verifyToken};
