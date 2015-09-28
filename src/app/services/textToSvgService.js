angular.module('i8Editor')
    .factory('textToSvgService', ['$q', 'opentypeService', textToSvgService]);


function textToSvgService($q, opentypeService) {
    var pathToFonts = '/src/fonts/'
    var svgElementBegin = '<svg xmlns="http://www.w3.org/2000/svg">'
    var svgElementEnd = '</svg>';

    var fonts = {};


    var service = {
        getSVG: getSVG
    };

    return service;

    function getSVG(text, fontName, size) {
        var deferred = $q.defer();
        var localFont = fonts[fontName];
        if (localFont) {
            toSvg(localFont);
        } else {
            opentypeService.load(pathToFonts + fontName, function (err, font) {
                if (!err) {
                    fonts[fontName] = font;
                    toSvg(font);
                } else {
                    deferred.reject('Error load font');
                }
            });
        }


        function toSvg(font) {
            var path = font.getPath(text, 0, size, size);
            var pathSvg = path.toSVG();
            deferred.resolve(svgElementBegin + pathSvg + svgElementEnd);
        }

        return deferred.promise;
    }
}