(function() {
	"use strict";
	angular.module('app').controller('NavBarController', NavBarController);
	NavBarController.$inject = ['$state', 'UserFactory', "$rootScope", '$timeout'];

	function NavBarController($state, UserFactory, $rootScope, $timeout) {
		var vm = this;
		// vm.currentState = $state.is();
		// console.log(vm.currentState)
		vm.user = {};
		vm.status = $rootScope._user;
		console.log(vm.status)
		vm.class = 'fadeInLeft'
		vm.seeComment = false;
		
		vm.seeComment = function(){
			vm.seeComment = true;
			console.log(vm.seeComment)
		}
		vm.hideComment = function(){
			vm.seeComment = false;
		}
		// console.log(vm.status)
		vm.register = function() {
			// console.log('in register function')
			UserFactory.register(vm.user).then(function() {
				$timeout(function() {
					vm.users = {}
					$state.go('Home')
					vm.class = 'fadeInLeft'
				}, 400)
			}, function(error){
				console.log(error)
				$state.go('Register')
				vm.class = 'fadeInLeft'
			})
		};

		vm.login = function() {
			console.log('im trying to login')
			UserFactory.login(vm.user).then(function(res) {
				console.log('made it back to login function in nav controller')
				vm.status = $rootScope._user;
				$timeout(function() {
					$state.go('Home')
					console.log(vm.status)
					vm.class = 'fadeInLeft'
				}, 400);
				
			}, function(error){
				vm.class = 'fadeInLeft'
				vm.errorMessage = true;
					$state.go('LogIn')
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go("Home");
		}
		vm.getUser = function(){
			// console.log('working inside get userFunction')
			UserFactory.getUser(vm.status.id).then(function(res){
				vm.pinUser = res
				// console.log('got user')
				// console.log(vm.pinUser)
			})
		}
		if(vm.status.id){
			vm.getUser();
		}
	
	}
})();
