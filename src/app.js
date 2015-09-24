'use strict';

angular.module('i8Editor', 
	[
	'ui.router',
	'ngDialog'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/main");
		
		$stateProvider
			.state('main', {
				url: "/main",
				templateUrl: "src/app/templates/main.html",
				controller: 'mainController',
				controllerAs: 'mainCtrl'
			});
	});