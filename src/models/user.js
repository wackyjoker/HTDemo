var mongoose              = require("mongoose");
// var passportlocalmongoose	= require("passport-local-mongoose");
var bcrypt                 = require('bcrypt');

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

//authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// UserSchema.plugin(passportlocalmongoose);
var User = mongoose.model('User', UserSchema);
module.exports = User;


module.exports.getUserByUsername= function(username,callback){
      var query = {username:username};
      console.log("------------\nlooking for users");
      User.findOne(query,callback);
};

module.exports.getUserById= function(id,callback){
      User.findById(id,callback);
};


module.exports.confirmPassword = function(candidatePassword,hash,callback){
    console.log("checking passwords: "+candidatePassword+"  & "+hash);
    bcrypt.compare(candidatePassword,hash,function(err,confirmed){
      if(err){
        return callback(err);
      }
      callback(null,confirmed);
    })
}