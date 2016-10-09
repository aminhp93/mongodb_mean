var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/quoting_redux");

var QuoteSchema = new mongoose.Schema({
	name: {type: String},
	quote: {type: String},
	like: {type: Number, default: 0}
}, {timestamps: true});

mongoose.model("Quote", QuoteSchema);

var Quote = mongoose.model('Quote');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

app.post('/quotes', function(request, response){
	var quote = new Quote({name: request.body.name, quote: request.body.quote})
	quote.save(function(err){
		if (err){
			console.log("err");
		} else {
			response.redirect('/quotes');			
		}
	})
})

app.get('/add_like/:id/:like', function(request, response){
	Quote.update({_id: request.params.id}, {like: (parseInt(request.params.like) + 1)}, function(err){
		if (err){
			console.log('err');
		} else {
			response.redirect('/quotes');
		}	
	})
})

app.get('/quotes', function(request, response){
	Quote.find({}, function(err, quotes){
		if (err){
			console.log('err');
		} else {
			response.render('quotes', {quotes: quotes});
		}	
	}).sort({createdAt: -1})
})

app.listen(3000, function(){
	console.log("Quotes listening on port 3000");
})