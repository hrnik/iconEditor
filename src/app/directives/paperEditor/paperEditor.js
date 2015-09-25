angular.module('i8Editor')
	.directive('paperEditor', ['paperService', paperEditor]);

function paperEditor(paperService) {
	// Runs during compile 
	return {
		restrict: 'E',
		scope:{
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

			var canvas = element.children()[0];
			var project = paper.setup(canvas);
			var svgIcon = paper.project.importSVG(document.getElementById('svg'));
			
			svgIcon.bounds.height = svgHeight;
			svgIcon.bounds.width = svgWidth;

			//svgIcon.position = new paper.Point((canvas.height-svgHeight)/2,(canvas.width-svgWidth)/2);
			svgIcon.position = new paper.Point(canvas.width/2,canvas.height/2);


			var text = new paper.PointText({			
				content: iconText,
				fillColor: fontColor,
				font: fontFamily,
				fontWeight: fontWeight,
				fontSize: fontSize
			});

			text.position = new paper.Point(canvas.width/2, 220)

		
			text.onMouseDrag = function (event) {
				 text.position = new paper.Point(event.point);
				  paper.view.update();
			}

			text.onMouseUp = function(event) {
   				 text.position = new paper.Point(event.point);
   				 paper.view.update();
			}

			$scope.$watch('iconText', function (value) {
				text.content = value;
				paper.view.update();
			});

			$scope.$watch('fontSize', function (value) {
				text.fontSize = value;
				paper.view.update();
			});		

			$scope.$watch('fontWeight', function (value) {
				text.fontWeight = value;
				paper.view.update();
			});

			$scope.$watch('fontColor', function (value) {
				text.fillColor = value;
				paper.view.update();
			});	

			$scope.$watch('fontFamily', function (value) {
				text.font = value;
				paper.view.update();
			});

				// Draw the view now:
			paper.view.draw();

			if($scope.paperEditorCtrl){
				if(angular.isObject($scope.paperEditorCtrl)){
						var ctrl = $scope.paperEditorCtrl;

						ctrl.exportSvg = exportSvg;


						function exportSvg(id) {
							var svg = paper.project.exportSVG({
								matchShapes:true
							});
							document.getElementById(id).appendChild(svg);
						}
				}
			}
			
		
		}
	};
}