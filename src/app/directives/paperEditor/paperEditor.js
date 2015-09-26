angular.module('i8Editor')
	.directive('paperEditor', ['paperService', 'textToSvgService', paperEditor]);

function paperEditor(paperService, textToSvgService) {
	// Runs during compile 
	return {
		restrict: 'E',
		scope: {
			iconText: '=',
			fontSize: '=',
			fontWeight: '=',
			fontColor: '=',
			fontFamily: '=',
			paperEditorCtrl: '='
		},
		templateUrl: 'src/app/directives/paperEditor/paperEditor.html',
		link: function($scope, element, attrs) {
			var paper = paperService;
			//defaultParameter
			var svgHeight = 140;
			var svgWidth = 140;
			var iconText = $scope.iconText || 'added text';
			var fontSize = $scope.fontSize || 35;
			var fontWeight = $scope.fontWeight || 'normal';
			var fontColor = $scope.fontColor || '#000';
			var fontFamily = $scope.fontFamily || 'helvetica-lightregular';

			//init project
			var canvas = element.children()[0];
			var project = paper.setup(canvas);
			var svgIcon = paper.project.importSVG(document.getElementById('svg'));
			var position = {
				x: canvas.width / 2,
				y: 220
			};
			var textItem = {};

			svgIcon.bounds.height = canvas.height;
			svgIcon.bounds.width = canvas.width;

			svgIcon.position = paper.view.center;

			textToSvg();

			$scope.$watch('iconText', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					iconText = newValue;
					textToSvg();
				}
			});

			$scope.$watch('fontSize', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					fontSize = newValue;
					textToSvg();
				}
			});

			/*$scope.$watch('fontWeight', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					textItem.fontWeight = value;
					paper.view.update();
				}
			});
			*/
			$scope.$watch('fontFamily', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					fontFamily = newValue;
					textToSvg();
				}
			});


			$scope.$watch('fontColor', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					textItem.fillColor = value;
				}
			});

		
			function textToSvg() {
				textToSvgService.getSVG(iconText, fontFamily, fontSize).then(function(result) {

					//if textItem exist, update position
					if (textItem.position) {
						position.x = textItem.position.x;
						position.y = textItem.position.y;
					}

					//if textItem exist - remove textItem
					if (textItem.remove) {
						textItem.remove();
					}

					textItem = paper.project.importSVG(result);
					textItem.position = new paper.Point(position.x, position.y);

					paper.view.update();

					//pseudo area around textItem for d'n'd
					var path = new paper.Path.Rectangle(textItem.bounds);
					path.fillColor = 'red';
					path.opacity = 0;

					path.onMouseDrag = function(event) {
						moveItem(event);
					}

					path.onMouseUp = function(event) {
						moveItem(event);
					}


					function moveItem(event) {
						var point = new paper.Point(event.point);
						textItem.position = point;
						path.position = point;
						paper.view.update();
					}
				});


			}

			//external ctrl directive
			if ($scope.paperEditorCtrl) {
				if (angular.isObject($scope.paperEditorCtrl)) {
					var ctrl = $scope.paperEditorCtrl;

					ctrl.exportSvg = exportSvg;


					function exportSvg(id) {
						var svg = paper.project.exportSVG({
							matchShapes: true
						});
						document.getElementById(id).appendChild(svg);
					}
				}
			}


		}
	};
}