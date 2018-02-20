var express 		   = require("express"),
	  app 	    		 = express(),
  	mongoose	  	 = require("mongoose"),
  	passport	  	 = require("passport"),
  	LocalStrategy	 = require("passport-local"),
  	User      	 	 = require('./src/models/user'),
  	path 	     	 	 = require('path'),
  	bodyParser 		 = require("body-parser"),
    cookieParser   = require("cookie-parser"),
  	session  	   	 = require("express-session"),
  expressValidator = require("express-validator"),
  	MongoStore 	 	 = require('connect-mongo')(session),
    flash		    	 = require('connect-flash'),
    bcrypt         = require('bcrypt'),
  	favicon 	  	 = require("serve-favicon");


    app.set('views', path.join(__dirname, '/src/views'));
	app.set('view engine','ejs');
 


  // body parse middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

	app.use("/assets", express.static(__dirname + "/public/assets"));
	app.use("/images",express.static(__dirname + "/public/images"));
	app.use("/webfonts",express.static(__dirname+"/public/assets/webfonts"));
	app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
	
	

var localurl='mongodb://localhost/ht_users';
var combinedUrl= process.env.DATABASEURL || localurl ; 
//connect to mongodb
mongoose.connect(combinedUrl);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


//use sessions for tracking logins
	app.use(session({
	secret:"emma is still the most brilliant and beutiful woman",
	resave:false,
	saveUninitialized:false,
// 	store: new MongoStore({
//     mongooseConnection: db
// })
}));
// passport init
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());
//global flash message
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.success_msg = req.flash("success_msg");
	res.locals.success = req.flash("success");
	next();
});



//express Validator
app.use(expressValidator());


//express passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
   function(username, password, callback) {
    User.getUserByUsername(username,function(err,users){
      if(err){
        return callback(err);
      }
      if(!users){
        return callback(null,false,{message:"User Doesn't Exist"});
      } else {
      	 User.confirmPassword(password,users.password,function(err,confirmed){
        if(err){
          return callback(err);
        }
        if(confirmed){
          return callback(null,users,{message:"Login Successful, Welcome "+users.username});
        } else {
          return callback(null,false,{message:"Invalid Password"});
        }
      });
      }
    });
    }
));
passport.serializeUser(function(user, callback) {
  callback(null, user._id);
});
passport.deserializeUser(function(id, callback) {
  User.getUserById(id, function(err, user) {
    callback(err, user);
  });
});
// include routes
var indexRoute		 = require("./src/routes/landing");
app.use(indexRoute);


//error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(Error);
});



app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});






app.listen(process.env.PORT || 3001, function(err){
	if(err){
		console.log(err);
			} else {
	console.log('Server Started at 3001');
					}
	});