var express = require("express"), //route page
	router  = express.Router(),
	passport= require("passport"),
	User 	= require("../models/user");

router.get('/', function(req,res){
	res.render("index");
}); // Landing page



router.post("/register",function(req,res){		//register route
	var newUser = new User({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		passwordConf: req.body.passwordConf
	});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			// req.flash("error",err.message); 
			return res.render("login");
		} 

			passport.authenticate("local")(req,res,function(){
				// req.flash("success","Welcome"+user.username);
				res.redirect("/login");
			});
		});

});


router.get("/login",function(req,res){
	res.render("login");
});//Login route


router.post("/login",passport.authenticate("local",{ // login POST
	successRedirect : "/",
	failureRedirect : "/login"
}),function(req,res){
});

module.exports = router;
