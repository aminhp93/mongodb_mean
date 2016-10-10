var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/message_board');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	name: {type: String, require: true, minlength: 4},
	message: {type: String, require: true, minlength: 1},
	comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

var CommentSchema = new mongoose.Schema({
	name: {type: String, require: true, minlength: 4},
	comment: {type: String, require: true, minlength: 1},
	_post: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {timestamps: true});

mongoose.model('Post', PostSchema);
mongoose.model("Comment", CommentSchema);

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	Post.find({})
	.populate('comment')
	.exec(function(err, posts){
		response.render('index', {posts: posts})		
	})
})

app.post('/post', function(request, response){
	console.log(request.body);
	var post = new Post({name: request.body.name, message: request.body.message});
	post.save(function(err){
		if (err){
			console.log("Something went wrong")
		} else {
			response.redirect('/');
		}
	})
})

app.post('/post/:id', function(request, response){
	Post.findOne({_id: request.params.id}, function(err, post){
		console.log(request.body);
		var comment = new Comment({name: request.body.name, comment: request.body.comment});
		comment._post = post._id;
		post.comment.push(comment);
		comment.save(function(err){
			post.save(function(err){
				if(err){
					console.log('err');
				} else {
					response.redirect('/');
				}
			})
		})
	})
})

app.listen(3000, function(){
	console.log("mongoose dashboard listening on port 3000");
})