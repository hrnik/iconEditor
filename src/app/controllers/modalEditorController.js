angular.module('i8Editor')
	.controller('modalEditorController', [modalEditorController]);

function modalEditorController() {
	var vm = this;

	vm.iconText = 'Awesome text';
	vm.fontSize = 28;
	vm.paperEditorCtrl = {};
}