var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoosesssssssssssss');

// create a schema for users
var UserSchema = new mongoose.Schema({
	name: {type: String},
	age: {type: Number}
}, {timestamps: true})

// store the shcema under the name "user"
mongoose.model('USER', UserSchema);

// retrieve the schema called "user" and store it to the variable User
var User = mongoose.model('USER');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	// User.find({}, function(err, users){
	// 	console.log(users);
	// 	if (err){
	// 		console.log("Error");
	// 	} else {
	// 		response.render('index', {users: users});
	// 	}
	// })
	response.render('index');

})

app.post('/users', function(request, response){
	console.log('Post Data', request.body);
	var user = new User({name: request.body.name, age: request.body.age});
	user.save(function(err){
		if (err){
			console.log('Something went wrong');
		} else {
			console.log('Successfully added a user');
			response.redirect('/');
		}
	})
})

app.listen(3000, function(){
	console.log("Listening on port 3000");
})