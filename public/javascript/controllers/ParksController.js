(function(){
	'use strict'
	angular.module('app').controller('ParksController', ParksController);
	ParksController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function ParksController($state, HomeFactory, $timeout){
		var vm = this;
		HomeFactory.getTrees().then(function(res){
			console.log(res);
		})
		
	}

})()
