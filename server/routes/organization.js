const express = require('express');
const router = express.Router();

require('../services/passport');
const passport = require('passport');

const organizationController = require('../controllers/organization');

router.post('/create',organizationController.createNewOrganization)

module.exports = router;