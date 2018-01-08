var express 		 = require("express"),
	app 			 = express(),
	mongoose		 = require("mongoose"),
	passport		 = require("passport"),
	User    	 	 = require('./models/user'),
	LocalStrategy	 = require("passport-local"),
	path 		 	 = require('path'),
	favicon 		 = require("serve-favicon");

var indexRoute		 = require("./routes/landing");







	

	app.set('view engine','ejs');
	app.use("/assets", express.static(__dirname + "/assets"));
	app.use("/images",express.static(__dirname + "/images"));
	app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));


	app.use(indexRoute);

	app.listen(process.env.PORT || 3001, function(err){
	if(err){
		console.log(err);
			} else {
	console.log('Server Started');
					}
	});