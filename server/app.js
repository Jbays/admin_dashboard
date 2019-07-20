const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

require('dotenv').config();

// mongoose.connect(`mongodb+srv://jaybays:${password}@swytch-db-obf3f.mongodb.net/test?retryWrites=true&w=majority`);

const authRoutes = require('./routes/auth');
const devicesRoutes = require('./routes/device');

const app = express();

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
db.on("error", () => {
  console.error.bind(console, "# MongoDB - connection error: ")
});
db.once("open", () => {
  console.log("Swytch database connection ok!")
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth',authRoutes);
app.use('/devices',devicesRoutes);

app.use((error, req, res, next) =>{
  console.error(`error from server: ${error}`);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  //this line results in this error: TypeError: res.status(...).join is not a function
  res.status(status).join({message:message,data:data});
})

app.listen(config.port);

console.log(`Server is listening on http://localhost:${config.port}`);
