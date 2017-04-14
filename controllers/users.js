const User = require('../models/schemas/user');

/*
var userDb = [];
var idCounter = 0;
userDb.insertUser = function(user , callback) {
	user.id = idCounter;
	idCounter++;
	this.push(user);
	callback();
};
userDb.getUserById = function(id , callback) {
	for(var i=0 ; i<this.length ; i++) {
		if(+id === this[i].id) {
			callback(this[i]);
		}
	}
};
*/

/*module.exports.createUser = function(req,res) {
	//validate input
	//create actual user
	var newUser = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		createdDate: new Date()
	};
	store the user
	userDb.insertUser(newUser , function() {
		return res.send('it worked!!!');
	});

*/
module.exports.createUser = function(req,res) {
	
	var data = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		createdDate: new Date()
	};
	
	var newUser = new User(data);
	
	//insert or store  user using mongoose	
	newUser.save(function(err,user) {
		return res.send('it worked');
	});
		
}

/*
module.exports.getUsers = function(req,res) {
	return res.send(userDb);
}

*/

module.exports.getUsers = function(req, res, next) {
	User.find( {} , function(err , users) {
		if(err) return next(err)
		return res.json(users);		
	});
}


module.exports.getUserById = function(req,res,next) {
	User.findById(req.params.id , function(err , user) {
		if(err) return next(err);	
		if(!user) 
			return res.status(404).send('user not found');
	return res.json(user);
	
	});
}

//module.exports.getUserById = function(req,res) {
//	userDb.getUserById(req.params.id , function(user) {
//		return res.json(user);
//	});

module.exports.updateUser = function(req,res,next) {
	User.findOneAndUpdate(req.params.id , req.body , { new:true } , function(err, user) {
	if(err) return next(err);
	if(!user) return res.status(404).send("No user with that ID");
	return res.json(user);	
	});	

}

module.exports.deleteUserById = function(req,res,next) {
	User.findOneAndRemove(req.params.id , function(err , user) {
		if(err) 
			return next(err);
		if(!user) 
			return res.status(404).send("No user with that ID");
		return res.status(200).send('OK');
	});

}

