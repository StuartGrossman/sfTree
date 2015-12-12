(function(){
	'use strict'
	angular.module('app').controller('CreateTreeController', CreateTreeController);
	CreateTreeController.$inject = ['$state', 'HomeFactory', '$timeout'];

	function CreateTreeController($state, HomeFactory, $timeout){
		var vm = this;
		vm.tree = {}
		vm.class = "fadeInRight";
		vm.showMap = function(){
			var lati = vm.tree.lat
			var lngi = vm.tree.lng
			console.log(lati, lngi)
			vm.map = new google.maps.Map(document.getElementById('map'), {
						    center: {lat: 37.7833, lng: -122.4167},
						    scrollwheel: true,
						    zoom: 13,
	 			 		})
			// var marker = new google.maps.Marker({
			// 			    position: myLatLng,
			// 			    map: map,
			// 			    animation: google.maps.Animation.DROP,
			// 			    title: tree.title
			// 			})
			// function toggleBounce() {
			// 			  if (marker.getAnimation() !== null) {
			// 			    marker.setAnimation(null);
			// 			  } else {
			// 			    marker.setAnimation(google.maps.Animation.BOUNCE);
			// 			  }
			// 			}
		}
		vm.Createtree = function(){
			vm.tree.created = new Date();
			console.log('inside Createtree controller')
			console.log(vm.tree)
			vm.tree.park = vm.distance

			// console.log(vm.tree)
			HomeFactory.CreateNewTree(vm.tree).then(function(res){
				// console.log('back to the state');
				$state.go('Home');
				// console.log('this is the res to creating tree ' + res);
				$timeout(function() {
					$state.go('Home');
					vm.class = "fadeInRight"
					vm.tree = {}
				}, 400);
				
			})
		}
	}

})()
