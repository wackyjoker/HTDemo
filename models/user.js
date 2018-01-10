var mongoose = require("mongoose"),
	passportlocalmongoose	= require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	 email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});


UserSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User",UserSchema);