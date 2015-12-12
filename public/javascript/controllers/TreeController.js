(function(){
	'use strict'
	angular.module('app').controller('TreeController', TreeController);
	TreeController.$inject = ['$state', 'HomeFactory', '$timeout', '$stateParams'];

	function TreeController($state, HomeFactory, $timeout, $stateParams){
		var vm = this;
		var tree_id = $stateParams.id
		function findTree(){
			HomeFactory.getTree(tree_id).then(function(res){
			console.log(res);
			vm.treeInfo = res;
			console.log(vm.parkInfo);

			})
		}

		if($stateParams.id){
			findTree();
		}
	}

})()
