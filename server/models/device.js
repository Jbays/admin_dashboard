const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: String,
  devId:Number,
  lon:Number,
  lat:Number,
  capacity:Number,
  country:String,
  devType:String,
  source:String
});

const Device = mongoose.model('Device',DeviceSchema);

module.exports = Device;