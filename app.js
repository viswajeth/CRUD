const express = require('express');
const mongoose = require('mongoose');
const {google} = require('googleapis')
const keys=require('./credentials.json');
const { ObjectId } = require('mongodb');
 const read=require('./read.js')


const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){  
   
  if(err){
      console.log(err);
      return;
  }else{
      console.log("Connected!");
      gsrun(client)
  }
});
const app = express();
const PORT = 3000;

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  user_id:Number,
  name: String,
  age: Number,
  email: String,
  phone: Number,
  postal_code: Number,
});

const User = mongoose.model('User', userSchema);


// Middleware to parse JSON body
app.use(express.json());
async function gsrun(cli){
  
  app.get('/create_user',async(req,res)=>{
  try{
    const gsapi=google.sheets({version:'v4',auth:cli});
  const opt={
    spreadsheetId:'YOUR_SPREADSHEET_ID',
    range:'Sheet1!A3:F3'
  };
   var data = await gsapi.spreadsheets.values.get(opt);
    const dataArray=data.data.values;
    const user = {
      user_id: dataArray[0][0],
      name: dataArray[0][1],
      age: dataArray[0][2],
      email: dataArray[0][3],
      phone: dataArray[0][4],
      postal_code: dataArray[0][5]
    }
    const createdUser = await User.insertMany(user);
    res.status(201).json(createdUser);
    
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
  }

  });

  
  app.get('/delete_user',async(req,res)=>{
    try{
      const gsapi=google.sheets({version:'v4',auth:cli});
    const opt={
      spreadsheetId:'YOUR_SPREADSHEET_ID',
      range:'Sheet1!A7'
    };
      const data = await gsapi.spreadsheets.values.get(opt);
      const userId=data.data.values;
      await User.deleteOne({_id : userId });
      res.status(200).json({message:"User deleted successfully"});
     
    }catch(err){
      res.status(500).json({err:"Internal Server Error"});
    }
  
    });

    app.get('/update_user',async(req,res)=>{
      try{
        const gsapi=google.sheets({version:'v4',auth:cli});
      const opt={
        spreadsheetId:'YOUR_SPREADSHEET_ID',
        range:'Sheet1!A13:G13'
      };
       var data = await gsapi.spreadsheets.values.get(opt);
        const dataArray=data.data.values;
        const user = {
          user_id: dataArray[0][0],
          name: dataArray[0][1],
          age: dataArray[0][2],
          email: dataArray[0][3],
          phone: dataArray[0][4],
          postal_code: dataArray[0][5]
        }
        const userId={user_id:dataArray[0][0]}
        await User.updateOne(userId, user);
        res.status(200).json({ message: 'User updated successfully' });
        
      }catch(err){
        res.status(500).json({err:"Internal Server Error"});
      }
    
      });
      app.get('/read_users',async(req,res)=>{
        try{
           read.main();
          
          res.status(200).json({ message: 'Users populated in the Google Sheet' });
        
        }catch(err){
          res.status(500).json({err:"Internal Server Error"});
        }
      
        });



}
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
