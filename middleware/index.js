var middlewareObj = {};



middlewareObj.isLoggedIn = function (req,res,next){  // is logged in function
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Sign in First!");
	res.redirect("/login");
}

module.exports = middlewareObj;