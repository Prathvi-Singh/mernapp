const { application } = require('express');
const express=require('express');
const  router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authenticate=require('../middleware/authenicate')

require('../db/conn');


const User=require('../model/user_schema');

router.use(express.json());

router.get('/',(req,res)=>{
    console.log("hello.........");
    res.send("hello.....");
});

router.post('/signin',async(req,res)=>{
   //   console.log(req)
  try{
    const {email,password}=req.body;
    console.log(req.body);
  
    if(!email || !password){
        return res.status(400).json({error:"please filled both information"});
    }

    const User_info=await User.findOne({email:email});
    console.log(User_info);

    const match = await bcrypt.compare(password,User_info.password);

    const token=await User_info.generateAuthToken();
    console.log(token);
    
  //   res.cookie("jwtoken",token,{
  //     expires:new Date(Date.now + 25892000000),
  //     httpOnly:true,
  //   });
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });


    if(!match){
      console.log(match);
       return res.status(400).json({error:"invalid increndtials"});
    }
   
  res.status(201).json({message:'successfully signin'});
  }
  catch(err){
       console.log(err);
  }
})

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const {name,email,phone,work,password,cpassword}=req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        res.status(422).json({error:"you missed some information"});
    }
    else if(password!=cpassword){
      res.status(422).json({error:"password and cpassword not matching"}); 
    }
    
    try{
        const userExist=await User.findOne({email:email})

            if(userExist){
                return res.status(422).json({error:"this info already present"});
            }
    
            const user_info =new User(req.body);
    
            await user_info.save()
    
            res.status(201).json({message:'successfully register'});
              
    }
    catch(err){
       console.log(err);
    }

});
 
router.get('/about',authenticate,(req,res)=>{
    console.log("I am unofficial about page");
    res.send("hello, I am hello"); 
})
  



module.exports=router;


// router.post('/register',(req,res)=>{
//     console.log(req.body);
//     //res.json({message:req.body});
//     const {name,email,phone,work,password,cpassword}=req.body;
//   //  res.json({message:name});
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         res.json({error:"you missed some information"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"this info already present"});
//         }
  
//     const user_info =new User(req.body);

//     user_info.save().then(()=>{
//         res.status(201).json({message:'successfully register'});
//     }).catch((err) => {res.status(404).json({messagep:"some error"})});

// }).catch((err)=>{console.log(err);});
// });