var mongoose = require('mongoose');

var TreeSchema = mongoose.Schema({
	title: String,
	created: Date,
	personal: String,
	img1: String,
	img2: String,
	img3: String,
	img4: String,
	img5: String,
	img6: String,
	img7: String, //0 - 10 user rating,
	desc: {type: String, maxlength: 500},
	stars: Number,
	rating: String,
	deleted: {type: Boolean, default: true},
	lat: Number,
	lng: Number,
	park: Number


});

mongoose.model('Tree', TreeSchema);
