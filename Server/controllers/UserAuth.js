var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');
//var VerifyToken = require('./VerifyToken.js');

try{
// Signup
module.exports.Signup =  (req, res) => {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({

    username : req.body.username,
    password : hashedPassword,
    
  },
    function (err, user) {
      if (err) return res.status(500).send({error:err,Message:err.message})
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
};

// Fetching User Data
module.exports.userdata =  (req, res) => {

  User.findById(req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a Problem Finding the User.");
    if (!user) return res.status(404).send("No User found.");

    res.status(200).send(user);
  });

};

// Fetching All User Data except Current
module.exports.allusersdata =  (req, res) => {
  User.find( {_id:{$ne:req.userId} }, function(err, users){
    if (err) return res.status(500).send("There was a Problem Finding the User.");
    if (!users) return res.status(404).send("No User found.");

    res.status(200).send(users);
  });

};


// Login
module.exports.Login =  (req, res) => {

  User.findOne(
    {
      username: req.body.username
    },
    function (err, user) {
      if (err) return res.status(500).send({error:"Server Error"});
      if (!user) return res.status(404).send({Message:"No User Found"});
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null,Message:"Wrong Password" });

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
      
    });

};


// Logout
module.exports.Logout =  (req, res) => {
  res.status(200).send({ auth: false, token: null });
};


}
catch(err){
  var error = JSON.parse(err);
  console.log(error);
}