var mongooses = require('../controllers/mongooses.js')

module.exports = function(app){
	app.get('/', function(request, response){
		mongooses.show_all(request, response);
	})

	app.get('/mongooses/new', function(request, response){
		response.render('new');
	})

	app.get('/mongooses/:id', function(request, response){
		mongooses.get_one(request, response);
	})

	app.post('/mongooses', function(request, response){
		mongooses.add_one(request, response);
	})

	app.get('/mongooses/:id/edit', function(request, response){
		mongooses.get_one(request, response);
	})

	app.post('/mongooses/:id', function(request, response){
		mongooses.update_one(request, response);
	})

	app.post('/mongooses/:id/destroy', function(request, response){
		mongooses.delete(request, response);		
	})	
}