const express = require('express');
const router = express.Router();

require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

//update: might be having a problem where the token returns for good requests --> causing a problem since the token didn't go out in the frist place, but actually returns from the call
//unable to get require authentication while creating a new device
// const requireAuth = passport.authenticate('jwt', (err,res, info)=>{
//   if ( err) { console.error(err)}
//   console.log('err',err)
//   console.log('res',res)
//   console.log('info',info)
// })

//protects routes by verifying user token
const devicesController = require('../controllers/device');

// router.post("/create", requireAuth, devicesController.createNewDevice);
router.post("/create", devicesController.createNewDevice);

module.exports = router;