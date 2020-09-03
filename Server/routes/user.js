var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/UserAuth');
var VerifyToken = require('../controllers/VerifyToken');

// Permissions
var Permissions = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
  }

router.post('/Signup', [Permissions], ctrl.Signup);
router.post('/Login', [Permissions], ctrl.Login);
router.get('/userdata', [VerifyToken, Permissions], ctrl.userdata);
router.get('/allusersdata', [VerifyToken, Permissions], ctrl.allusersdata);
router.get('/Logout', [Permissions], ctrl.Logout);

module.exports = router;
