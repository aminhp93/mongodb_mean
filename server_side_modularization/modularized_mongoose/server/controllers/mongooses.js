
var mongoose = require('mongoose');
var Mongoose = mongoose.model('Mongoose');

module.exports = {
	show_all: function(request, response){
		Mongoose.find({}, function(err, mongooses){
			if (err){
				console.log('Errors');
			} else {
				response.render('index', {mongooses: mongooses})
			}
		})
	},

	get_one: function(request, response){
		Mongoose.find({_id: request.params.id}, function(err, mongooses){
			if (err){
				console.log("errors");
			} else {
				response.render('one', {mongooses: mongooses});
			}
		})
	},

	add_one: function(request, response){
		var mongoose = new Mongoose({name: request.body.name});
		mongoose.save(function(err){
			if (err){
				console.log("Something went wrong")
			} else {
				response.redirect('/');
			}
		})
	},

	update_one: function(request, response){
		Mongoose.update({_id: request.params.id}, {name: request.body.name}, function(err){
			if (err){
				console.log("err");
			} else {
				response.redirect('/mongooses/' + request.params.id);
			}
		});
	},

	delete: function(request, response){
		Mongoose.remove({_id: request.params.id}, function(err){
			if (err){
				console.log("err");
			} else {
				response.redirect('/');
			}
		})	
	}
}