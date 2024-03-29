var express = require("express"), //route page
	router  = express.Router(),
	passport= require("passport"),
  middlewareObj = require("../middleware/index"),
	User 	= require("../models/user");

router.get('/', function(req,res){
	res.render("index");
}); // Landing page

router.get("/login",function(req,res,next){
	res.render("login");
});



// register page logic
router.post("/register",function(req,res,next){
 console.log(req.user);
  var   username=req.body.username,
        email   =    req.body.email,
        password=req.body.password,
        passwordConf= req.body.passwordConf;

      req.checkBody("username","Username is Required").notEmpty();
      req.checkBody("email","Email is Required").notEmpty();
      req.checkBody("email","Email is not valid").isEmail();
      req.checkBody("password","Password is required").notEmpty();
      req.checkBody("passwordConf","Passwords do  not match").equals(req.body.password);
      
      var errors = req.validationErrors();
      if(errors){
        req.flash("error_msg",errors);
       return  res.redirect("/login");
    }else {
      var userData = new User({
      email: email,
      username: username,
      password: password,
      passwordConf: passwordConf,
    });
         User.create(userData, function (error, user) {
      if (error) {return next(error);
      } else {
        req.session.userId = user._id;
        req.flash("success","Registered Sucessfully");
        return res.redirect('/login');
      }
    });}
});


//This is temp dashboard waiting to be done.
// router.get('/profile', function (req, res, next) {
//   User.findById(req.session.userId)
//     .exec(function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!');
//           err.status = 400;
//           return next(err);
//         } else {
//           return res.send('<h1>UserName: </h1>' + user.username + '<h2>EMail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//         }
//       }
//     });
// });



router.post("/logins",passport.authenticate("local",{ // login POST
  successRedirect : "/login",
  successFlash:true,
  failureRedirect : "/login",
  // badRequestMessage:"something went wrong!!",
  failureFlash:true
}),function(req,res){
  
});




router.get("/query",middlewareObj.isLoggedIn,function(req,res,next){
  if(req.isAuthenticated()){
  res.send("you've Logged In");
} else {
  req.flash("error","You must log in first");
  res.redirect("/login");
}

});



router.get('/logout', function (req, res, next) {
    req.logout();
    req.flash("success","Sucessfully Logged Out");
    res.redirect('/login');
});


module.exports = router;
