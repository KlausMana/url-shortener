var shortid = require('shortid');
var linkGenerator = {};

module.exports.generate = (url) => {
	let short = shortid.generate();
	let entry = {
		fullURL : url,
		shortenedIndex : short
	};

	let re = {'entry' : entry, 'short' : short};

	return re;
};