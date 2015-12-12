(function(){
	'use strict'
	angular.module('app').controller('SutroParkController', SutroParkController);
	SutroParkController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function SutroParkController($state, HomeFactory, $timeout){
		var vm = this;
		HomeFactory.getTrees().then(function(res){
			console.log(res);
			vm.parkInfo = res;
		})
		
	}

})()
