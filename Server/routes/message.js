var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/Messages');
var VerifyToken = require('../controllers/VerifyToken');

// Permissions
var Permissions = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
  }

router.get('/:id', [Permissions, VerifyToken], ctrl.getAllMessages);

module.exports = router;
