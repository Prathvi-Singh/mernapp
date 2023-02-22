const mongoose=require('mongoose');

//dotenv.config({path:'../db/config.env'});

const DB1=process.env.DB;
mongoose.set('strictQuery', true);
mongoose.connect(DB1,{useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log(`connection successfully connected`);
}).catch((err)=>{
    console.log("error error ...");
})