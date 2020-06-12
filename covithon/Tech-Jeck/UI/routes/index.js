var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.get('/home', function(req, res) {
  res.render('home', { title: 'Home'});
});

router.get('/upcomingRides', function(req, res) {
	res.render('upcomingRides', { title: 'UpcomingRides'});
});

router.get('/drivers', function(req, res) {
	res.render('drivers', { title: 'Drivers'});
});

router.get('/cabSchedule', function(req, res) {
	res.render('cabSchedule', { title: 'Cab Schedule'});
});

router.get('/cabs', function(req, res) {
	res.render('cabs', { title: 'Cabs'});
});

router.get('/cabRoutes', function(req, res) {
	res.render('cabRoutes', { title: 'Cab Routes'});
});

router.get('/cabSlots', function(req, res) {
	res.render('cabSlots', { title: 'Cab Slots'});
});

router.get('/cabTypes', function(req, res) {
	res.render('cabTypes', { title: 'Cab Types'});
});

router.get('/users', function(req, res) {
	res.render('users', { title: 'Users'});
});

router.get('/organizations', function(req, res) {
	res.render('organizations', { title: 'organizations'});
});






module.exports = router;

