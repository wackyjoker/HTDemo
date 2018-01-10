var express 		 = require("express"),
	app 			 = express(),
	mongoose		 = require("mongoose"),
	passport		 = require("passport"),
	User    	 	 = require('./models/user'),
	LocalStrategy	 = require("passport-local"),
	path 		 	 = require('path'),
	bodyParser 		 = require("body-parser")
	expressSsession  = require("express-session"),
	favicon 		 = require("serve-favicon");

var indexRoute		 = require("./routes/landing");



var localurl='mongodb://localhost/ht_users';

var combinedUrl= process.env.DATABASEURL || localurl ; 

mongoose.connect(combinedUrl);



	

	app.set('view engine','ejs');
	app.use(bodyParser.urlencoded({extended: true}));
	app.use("/assets", express.static(__dirname + "/assets"));
	app.use("/images",express.static(__dirname + "/images"));
	app.use("/webfonts",express.static(__dirname+"/assets/webfonts"));
	app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));


app.use(expressSsession({
	secret:"emma is still the most brilliant and beutiful woman",
	resave:false,
	saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoute);






app.listen(process.env.PORT || 3001, function(err){
	if(err){
		console.log(err);
			} else {
	console.log('Server Started');
					}
	});