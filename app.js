const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

dotenv.config({path:'./config.env'});
require('./db/conn.js');

app.use(require('./router/auth'));



const PORT=process.env.PORT;

const User=require('./model/user_schema');


// const middleware=(req,res,next)=>{
//     console.log('hello,i am middleware');
//      next();
// }


// app.get('/',(req,res)=>{
//      res.send("hello world");

// });

// app.post('/register',(req,res)=>{
//     console.log(req.body);
//     res.json({message:req.body});
// });


// app.get('/about',middleware,(req,res)=>{
//     console.log("I am unofficial about page");
//     res.send("hello, I am hello"); 
// })

app.listen(8000,(err)=>{
    console.log(`successfull login at port ${PORT}`)
})