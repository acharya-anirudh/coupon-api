const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./models/config');

const users = require('./controllers/users');
const coupons = require('./controllers/coupons');
var app = express();

mongoose.connect('localhost:5000');

if(app.get('env') === 'development') var dev = true;

// log if in dev mode
if(dev) app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));


//for now
//var userDb = [];

//====================================
// More Middleware
//====================================

app.param('id' , function(req,res,next,id) {
	if(!id.match(/^[0-9a-fA-F]{24}$/))
		return res.status(400).send("invalid ID");
});

//=====================================
// Routes
//=====================================

app.get('/users' , users.getUsers);
app.get('/users/:id' , users.getUserById);
app.post('/users' , users.createUser);
app.delete('/users/:id' , users.deleteUserById);
app.put('/users/:id' , users.updateUser);

app.get('/coupons' , coupons.getAllCoupons);
app.get('/coupons/:id' , coupons.getCouponById);
app.post('/coupons' , coupons.createCoupon);
app.put('/coupons/:id' , coupons.updateCoupon);
app.delete('/coupons/:id' , coupons.deleteCouponById);

//Handle 404
app.use(function(req,res,next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//our defined error handler
app.use(function(err,req,res,next) {
	console.log('oops');
	next(err);
});

//development error handler
if(dev) {
	app.use(function(err,req,res,next) {
		console.log(err);
		res.status(err.status || 500).send();
	});
}

//production error handler
app.use(function(err,req,res,next) {
	res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log("Listening at http://localhost:%s in %s mode" , server.address().port,app.get('env'));

module.exports =app;

