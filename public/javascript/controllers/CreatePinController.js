(function(){
	'use strict'
	angular.module('app').controller('CeatePinController', CeatePinController);
	CeatePinController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function CeatePinController($state, HomeFactory, $timeout){
		var vm = this;
		vm.pin = {}
		vm.class = "fadeInRight";


		HomeFactory.getLocation().then(function(res){
			// console.log(res.location.lat)
			vm.pin.lat = res.location.lat
			vm.pin.lng = res.location.lng
			
		})
		// vm.pin.lat = 37.114445
		// vm.pin.lng = -122.190023

		vm.CreatePin = function(){
			vm.pin.created = new Date(vm.pin.created + '-1-1');
			console.log('inside CreatePin controller')


			// console.log(vm.pin)
			HomeFactory.CreateNewPin(vm.pin).then(function(res){
				// console.log('back to the state');
				// console.log('this is the res to creating pin ' + res);
				$timeout(function() {
					$state.go('Home');
					vm.class = "fadeInRight"
				}, 400);
				
			})
		}
	}

})()
