const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

let LoginSchema   = new Schema({
	/*firstName: String,
	lastName: String,*/
	email: String,
	password: String,

});

module.exports = mongoose.model('Login', LoginSchema);
