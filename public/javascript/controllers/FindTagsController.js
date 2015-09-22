(function(){
	'use strict'
	angular.module('app').controller('FindTagsController', FindTagsController);
	FindTagsController.$inject = ['HomeFactory', '$state']
	function FindTagsController(HomeFactory, $state){
		var vm = this
		
		vm.allpins = {};
		
		Math.radians = function(degrees) {
		  return degrees * Math.PI / 180;
		};
 
// Converts from radians to degrees.
		Math.degrees = function(radians) {
		  return radians * 180 / Math.PI;
		};
		//map functions
		vm.infoWindow = new google.maps.InfoWindow();
		// vm.markers = [];
		
		vm.makeMap = function(lat, lng, pin, currentLocation){
			var myLatLng = {lat: lat, lng: lng};
			
			
			// vm.tempZoom = 8 + vm.distanceInMiles
			// console.log(vm.tempZoom) // not working
						vm.map = new google.maps.Map(document.getElementById('map'), {
						    center: {lat: lat, lng: lng},
						    scrollwheel: false,
						    zoom: 13,
	 			 		})
	 			 		for(var k = 0; k< pin.length; k ++){
	 			 			vm.createMarker(pin[k])
	 			 		}
	 			 		function getCurrentLocationPin(lat, lng){
		 			 		var marker = new google.maps.Marker({
					            map: vm.map,
					            position: new google.maps.LatLng(lat, lng),
					            title: 'Your Current Location'
					        });
					        google.maps.event.addListener(marker, 'click', function(){
					        	console.log(marker)
					            vm.infoWindow.setContent('<h2>' + 'Your Current Location' + '</h2>');
					            vm.infoWindow.open(vm.map, marker);
					        });
				    	}
				    	getCurrentLocationPin(lat, lng)
	 			 
						function toggleBounce() {
						  if (marker.getAnimation() !== null) {
						    marker.setAnimation(null);
						  } else {
						    marker.setAnimation(google.maps.Animation.BOUNCE);
						  }
						}
	 	}

		vm.createMarker = function (info){
	        // console.log(info)
	        var marker = new google.maps.Marker({
	            map: vm.map,
	            position: new google.maps.LatLng(info.lat, info.lng),
	            title: info.title
	        });
	        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

	        // console.log(info)
	        google.maps.event.addListener(marker, 'click', function(){
	        	console.log(marker)
	            vm.infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
	            vm.infoWindow.open(vm.map, marker);
	        });
	        
	        // vm.markers.push(marker);
	        
	    } 
	    vm.openInfoWindow = function(e, selectedMarker){
        		e.preventDefault();
        		console.log(selectedMarker)
        		google.maps.event.trigger(selectedMarker, 'click');
    	} 
		vm.pinlocation = {}
		// console.log('insdie findtags controller')
		
		function getGeo(){
			HomeFactory.getLocation().then(function(res){
				// console.log(res)
				vm.pinlocation = res
				vm.currentLat = vm.pinlocation.location.lat
				vm.currentLng = vm.pinlocation.location.lng

				// console.log(vm.pinlocation)
			})
		}


		getGeo();


		vm.allLoc = {};

		vm.refreshLocation = function(){
			getGeo();
			vm.mapStatus = true;
			getPins(vm.allpins, vm.currentLat, vm.currentLng)
			console.log(vm.allpins)
			// console.log(vm.allpins, vm.currentLat, vm.currentLng);
			// for(prop in vm.allpins){
			// 	console.log(prop)
			// }
			// 
		}
		function getPins(pins, lat, lng){
			HomeFactory.getPins().then(function(res) {
				// console.log('hitting home controler')
				// console.log(res);
				pins = res;
				
				// console.log(pins)
				vm.displayPinArray = [];
				for(var i =0; i< pins.length; i++){
					// console.log('in loop')
					// console.log('this is the current latitude ' + pins[i].lat)
					// console.log('this is the current longitude ' + pins[i].lng)
					// console.log(getSpaceDiffernece(lat, pins[i].lat, lng, pins[i].lng))
					// console.log(vm.distanceInMiles)
					vm.tempDistance = angular.copy(vm.distanceInMiles)
					// getSpaceDiffernece(37.8336281, 37.833628, -122.20298319999999, -122.202983);
					if(getSpaceDiffernece(lat, pins[i].lat, lng, pins[i].lng) < (vm.tempDistance * 1000)){
						// console.log(pins[i])
						vm.displayPinArray.push(pins[i]);
						// console.log(vm.displayPinArray);
						// console.log(vm.distanceInMiles)
						// vm.tempDistance = vm.distanceInMiles / 1000
						// console.log('made it')
						 // creates map with u in the center
					}
					
				}
				vm.makeMap(lat, lng, vm.displayPinArray, 'Current Location')
				// console.log(allpins)
				
				
			});
		}

		function getSpaceDiffernece(lat1, lat2, lon1, lon2){

				var R = 6371000; // metres
				var φ1 = Math.radians(lat1);
				var φ2 = Math.radians(lat2);
				var temp1 = (lat2-lat1)
				var Δφ = Math.radians(temp1);
				var temp2 = (lon2-lon1)
				var Δλ = Math.radians(temp2);

				var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				        Math.cos(φ1) * Math.cos(φ2) *
				        Math.sin(Δλ/2) * Math.sin(Δλ/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

				var d = R * c;
				return d

				// vm.allpins = {}; // object that im going to filter pins froms
				// vm.allpins.distance = d;
				// getPins(vm.allpins);
				
				
		}				
	}
})();