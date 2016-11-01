var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user             : {
	username     :String,
    email        : String,
    password     : String,
	name	     : String
    }
});

module.exports = mongoose.model('User', userSchema);
