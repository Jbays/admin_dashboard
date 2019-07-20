const express = require('express');
const router = express.Router();

require('../services/passport')
const passport = require('passport')
// const requireAuth = passport.authenticate('jwt', { session: false })
const requireAuth = passport.authenticate('jwt', (err,res)=>{
  if ( err) { console.error(err)}
  console.log('hello')
})

//protects routes by verifying user token
const devicesController = require('../controllers/devices');

router.post("/create", requireAuth, devicesController.createNewDevice);

module.exports = router;