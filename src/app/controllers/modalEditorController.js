angular.module('i8Editor')
	.controller('modalEditorController', [modalEditorController]);

function modalEditorController() {
	var vm = this;

	vm.iconText = 'Awesome text';
	vm.fontSize = 28;
	vm.fontWeight = 'normal';
	vm.fontColor = '#000000';
	vm.fontFamily = 'helvetica-lightregular';
	vm.paperEditorCtrl = {};
}