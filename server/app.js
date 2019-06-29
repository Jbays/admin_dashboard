const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 2525;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[ENVIRONMENT];
const knex = require('knex')(config);

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