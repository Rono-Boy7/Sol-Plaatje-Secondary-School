// index.js in /routes folder

var express = require('express');
var router = express.Router();
let item = require('../models/item');
let indexController = require('../controller/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vaibhav Patel, Is My Name!', displayName: req.user ? req.user.displayName: '' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Vaibhav Patel, Is My Name!', displayName: req.user ? req.user.displayName: '' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us?', displayName: req.user ? req.user.displayName: '' });
});

// Get Router For Login Page
router.get('/login', indexController.displayLoginPage);
//Post Router For Login Router
router.post('/login', indexController.processLoginPage);

// Get Router For Registration Page
router.get('/register', indexController.displayRegisterPage);
//Post Router For Registratation Page
router.post('/register', indexController.processRegisterPage);

// Get Router For Logout Page
router.get('/logout', indexController.performLogout);

module.exports = router;
