var mongoose = require('mongoose');

var MongooseSchema = new mongoose.Schema({
	name: {type: String}
}, {timestamps: true});

mongoose.model('Mongoose', MongooseSchema);