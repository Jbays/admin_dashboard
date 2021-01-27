const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config');

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

db.on('error', ()=>{
  console.error.bind(console, "# MongoDB - connection error: ");
});

db.once('open', ()=>{ console.log("Swytch Database Connection ok!")});

const User = require('./models/user');
const Device = require('./models/device');
const Organization = require('./models/organization');

async function seed(){

  const firstUserObj = {
    _id: new mongoose.Types.ObjectId(),
    name:'first userz',
    password:'1234-ideclareathumbar',
    wallet:'string1',
    username:'first dude ever',
    email:"theshaman@aol.com",
    phone_number:'123-555-5128'
  }

  const secondUserObj = {
    _id: new mongoose.Types.ObjectId(),
    name:'second userz',
    password:'1234-ideclareathumbwar',
    wallet:'string2',
    username:'second dude ever',
    email:"theshaman@gmail.com",
    phone_number:'123-453-5128'
  }

  const thirdUserObj = {
    _id: new mongoose.Types.ObjectId(),
    name:'third userz',
    password:'5678-ideclareathumbwar',
    wallet:'string3',
    username:'third dude ever',
    email:"whatever@gmail.com",
    phone_number:'579-453-5128'
  }

  let first_user = await User.create(firstUserObj);
  let second_user = await User.create(secondUserObj);
  let third_user = await User.create(thirdUserObj);

  first_user.save();
  second_user.save();
  third_user.save();
  db.close();
}

seed();