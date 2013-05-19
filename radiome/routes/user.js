var mongoose = require('mongoose'),
	passport = require('passport'),
	passwordHash = require('password-hash'),
	fs = require('fs');


mongoose.connect('mongodb://localhost/test');

function encodePassword(pass) {
	var hashedPassword = passwordHash.generate(pass);
	return hashedPassword;
}

var userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true, trim: true, lowercase: true},
	password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

exports.User = User;
/*
 * GET users listing.
 */

exports.list = function(req, res){
	User.find({}, function (err, data) {
		if (err) res.send("user not found");
		res.json(data);
	});
};

exports.signup = function(req, res) {
	res.render('signup', {title: "radiome"});
};

exports.addUser = function(req, res){
	var newUser = new User({
		username: req.body.username,
		password: encodePassword(req.body.password)
	});

	newUser.save( function (err, data) {
		if (err) res.send(500, err);
		else {
			req.login(newUser, function (err) {
				if (err) res.send('FAIL');
				res.redirect('/');
			});
		}
	});
};

exports.login = function (req, res) {
	res.render('login', {title: "radiome"});
};

exports.stream = function (req, res) {
	res.render('stream', {user: req.user, title: "radiome"});
};

