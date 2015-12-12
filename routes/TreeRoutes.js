var mongoose = require('mongoose');
var Tree = mongoose.model('Tree');
var express = require('express');
var router = express.Router();
// var treeComment = mongoose.model('treeComment');
var jwt = require("express-jwt");
var User = mongoose.model('User');


var auth = jwt({
	secret: "_secret_sauce",
	userProperty: "payload"
})

router.use('/', function (req, res, next){
	console.log('in middle ware line 14')
	next();
})

router.param('id', function (req, res, next, id) {
	// console.log('in params function')
	// console.log(id);
	Tree.findOne({_id:id}, function (err, response){
		req.tree = response
		next();
	})
		// console.log('this is the tree ' + tree)
	

	
});
// router.post('/delete/:id', auth, function (req, res){
// 	// console.log('tyring to delete tree in server')
// 	tree.update({_id: req.params.id}, {deleted: false}, function (err, response){
// 		res.send();
// 	})
		
// })

// router.post('/:id', auth, function(req, res){
// 	// console.log('inside edit tree function in server line 34')
// 	// console.log(req.body)
// 	tree.update({_id: req.params.id}, req.body, function (err, response){
// 		// console.log(response);
// 		res.send();
// 	})
// })

// router.post('/add/:id', auth, function (req, res) {
//   // console.log('trying to add to likes')
//   var tree_id = req.params.id
//   console.log(tree_id)
// 	  tree.findOne({_id: tree_id}, function (err, response) {
// 	  	// console.log(response)
// 	  	var updatedLikes = response.likes
// 	  	// console.log(updatedLikes)
// 	  	//check ----
// 	  	updatedLikes = updatedLikes + 1
// 	  	tree.update({_id: response.id}, {likes: updatedLikes}, function (err, likes) {
// 	  		res.send()
// 	  	})
// 	  })
// })

// router.post('/sub/:id', auth, function (req, res) {
//   // console.log('trying to add to likes')
//   var tree_id = req.params.id
//   console.log(tree_id)
// 	  tree.findOne({_id: tree_id}, function (err, response) {
// 	  	// console.log(response)
// 	  	var updatedLikes = response.likes
// 	  	// console.log(updatedLikes)
// 	  	updatedLikes = updatedLikes - 1
// 	  	tree.update({_id: response.id}, {likes: updatedLikes}, function (err, likes) {
// 	  		res.send()
// 	  	})
// 	  })
// })

router.post('/', function (req, res){
	console.log(req.body)
	var tree = new Tree(req.body)
	console.log('-----------------' + 'adding tree to mongod')
	console.log(tree)
	tree.save(function(err, response){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!response) return res.status(400).send({err: "Could not create that tree."});
		// console.log('------------------------------')
		console.log('saved tree information');
		res.send();
	})
	
})

router.get('/', function (req, res){
	Tree.find({})
	.exec(function (err, trees) {
		// console.log(trees)
		console.log(trees)
		if(err) return res.status(500).send({err: "error getting all trees"});
		if(!trees) return res.status(500).send({err: "trees do not exist"});
		res.send(trees);
	});
})

router.get('/:id', function(req, res){
	// Tree.findOne({_id: req.id}, function(err, response){
	// 	console.log(response)
	// 	res.send(response);
	// })
	console.log('finding tree')
	 console.log(req.tree)
	 res.send(req.tree)
})
// router.get('/:id', function (req, res){
// 		res.send(req.tree)
// })





module.exports = router;