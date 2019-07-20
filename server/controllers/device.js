const Device = require('../models/device');

function createNewDevice(req,res,next){
  const userId = req.body.userId;
  const name = req.body.name;
  const lon = req.body.lon;
  const lat = req.body.lat;
  const capacity = req.body.capacity;
  const country = req.body.country;
  const devType = req.body.devType;
  const source = req.body.source;

  if ( !name ) {
    return res.status(422).send({ error: "Your device requres a name" });
  }
  
  Device.findOne({name},(err,existingDevice)=>{
    if (err){
      return next(err);
    }
    
    if (existingDevice){
      return res.status(422).send({error:"That device name is already in use.  Please choose a unique device name"});
    }

     else {
      const device = new Device({
        name:name,
        lon,
        lat,
        capacity,
        country,
        devType,
        source
      });

      device.save((err)=>{
         if(err){ 
           return next(err);
         }
     
         res.json({
           deviceId:device._id,
           name:name,
           note:'you successfully created a new device'
         });
       });
     }
  })
}

module.exports = {
  createNewDevice
}