var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/UserAuth');
var VerifyToken = require('../controllers/VerifyToken');

router.post('/Signup', VerifyToken, ctrl.Signup);
router.post('/Login', VerifyToken, ctrl.Login);
router.get('/userdata', VerifyToken, ctrl.userdata);
router.get('/Logout', VerifyToken, ctrl.Logout);

module.exports = router;
