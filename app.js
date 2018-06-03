var express = require('express');
var app = express();
var mg = require('mongoose');
var path = require('path');
var db = 'mongodb://klaus_mana:klaus123@ds245170.mlab.com:45170/urlshortener';
var conn = mg.connection;
mg.Promise = global.Promise;
var Url = require('./schemas/Url.model');
var link = require('./linkGenerator');
var bodyParser = require('body-parser');
var linkRouter = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/link', linkRouter);

mg.connect(db);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render("index.ejs");
});

app.post('/successful', (req, res) => {
	let fullUrl = req.body.url;
	let url = link.generate(fullUrl);
	conn.collection('urls').insert(url.entry);
	let short = url.short;
	res.render('success.ejs', {
		id : short
	});
});

linkRouter.get('/:short', (req, res) => {
	let short = req.params.short;
	Url.find({shortenedIndex : short}).exec((err, url) => {
		res.redirect(url[0].fullURL);
	});
});

port = 1234;
app.listen(port, () => {
	console.log('Finished Loading.\nListening to ' + port);
})