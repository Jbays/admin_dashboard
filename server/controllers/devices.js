const Device = require('../models/device');

function createNewDevice(req,res,next){
  console.log('req',req);
  console.log('you created a new device');
  console.log('Device',Device);
}

module.exports = {
  createNewDevice
}