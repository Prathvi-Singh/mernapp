const jwt=require('jsonwebtoken');
const User=require('../model/user_schema.js')

const Authenticate=async(req,res,next)=>{
  try{
      const  token = req.cookies.jwtoken;
      consolelog(token);
      const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
      const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});   
     
      if(!rootUser){
         throw new Error("user not found");
      }

      req.token=token;
      req.rootUser=rootUser;
      req.userID=rootUser._id;
      
      next();
    }
  catch(err){
    res.status(401).send('Unauthorized:No token provided')
    console.log(err)
}
}

module.exports=Authenticate;