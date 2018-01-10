var express = require("express"), //route page
	router  = express.Router(),
	passport= require("passport"),
	User 	= require("../models/user");

router.get('/', function(req,res){
	res.render("index");
}); // Landing Page

router.get("/login",function(req,res){
	res.render("login");
});//Login page

router.post("/login",function(req,res){
	res.send("testing post");
});

module.exports = router;
