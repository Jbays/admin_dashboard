const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 2525;
const password = process.env.MONGOPASS;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

mongoose.connect(`mongodb+srv://jaybays:${password}@swytch-db-obf3f.mongodb.net/test?retryWrites=true&w=majority`);

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PUT");
  next();
})

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`);
});

app.post('/createNewUser',(req,res)=>{

})