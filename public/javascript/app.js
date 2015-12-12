(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/home',
			contorller: 'HomeController',
			templateUrl: 'templates/Home.html'
		}).state('Parks', {
			url: '/parks',
			controller: 'ParksController',
			controllerAs: 'vm',
			templateUrl: 'templates/Parks.html'
		}).state('LogIn', {
			url: '/login',
			templateUrl: '/templates/Login.html'
		}).state('RegisterUser', {
			url: '/register',
			templateUrl: 'templates/Register.html'
		})
		.state('CreateTree', {
			url: '/createTree',
			controller: 'CreateTreeController',
			templateUrl: 'templates/CreateTree.html',
			controllerAs: 'vm'
		})
		.state('Sutro', {
			url: '/sutro',
			templateUrl: 'templates/sutroPark.html',
			controller: 'SutroParkController',
			controllerAs: 'vm'
		}).state('Tree', {
			url: '/tree/:id',
			controller: 'TreeController',
			controllerAs: 'vm',
			templateUrl: 'templates/Tree.html'
		})
		// .state('PinInfo', {
		// 	url: '/pin/:id',
		// 	controller: 'PinInfoController',
		// 	controllerAs: 'vm',
		// 	templateUrl: 'templates/PinInfo.html'
		
		// }).state('Profile', {
		// 	url: '/profile',
		// 	templateUrl: 'templates/Profile.html',
		// 	controller: 'NavBarController',
		// 	controllerAs: 'vm'
		// }).state('EditPin', {
		// 	url: '/pin/edit/:id',
		// 	controller: 'PinInfoController',
		// 	controllerAs: 'vm',
		// 	templateUrl: '/templates/EditPin.html'
		// }).state('FindTags', {
		// 	url: '/findTags',
		// 	contorller: 'FindTagsController',
		// 	contorllerAs: 'vm',
		// 	templateUrl: '/templates/FindTags.html'

		// })
		$urlRouterProvider.otherwise('/home');
	}
})();
