angular.module('i8Editor')
	.factory('textToSvgService', ['$q', 'opentypeService', textToSvgService]);


function textToSvgService($q, opentypeService) {
	var pathToFonts = '/src/fonts/'
	var svgElementBegin = '<svg xmlns="http://www.w3.org/2000/svg">'
	var svgElementEnd = '</svg>'


	var service = {
		getSVG: getSVG
	};

	return service;

	function getSVG(text, fontName, size) {
		var deferred = $q.defer();

		opentypeService.load(pathToFonts + fontName, function(err, font) {
			if (!err) {
				var path = font.getPath(text, 0, size, size);
				var pathSvg = path.toSVG();
				deferred.resolve(svgElementBegin + pathSvg + svgElementEnd);
			} else {
				deferred.reject('Error load font');
			}


		});

		return deferred.promise;
	}
}