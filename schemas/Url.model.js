var mg = require('mongoose');
var Schema = mg.Schema;

var UrlSchema = new Schema({
	fullURL : String,
	shortenedIndex: String
});

module.exports = mg.model('url', UrlSchema);