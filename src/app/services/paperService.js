angular.module('i8Editor')
		.factory('paperService', ['$window', paperService]);


function paperService ($window) {
	return $window.paper;
}


