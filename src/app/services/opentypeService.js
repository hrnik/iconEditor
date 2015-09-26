angular.module('i8Editor')
		.factory('opentypeService', ['$window', opentypeService]);


function opentypeService ($window) {
	return $window.opentype;
}


