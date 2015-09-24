angular.module('i8Editor')
		.controller('mainController', ['ngDialog', mainController]);


function mainController (ngDialog) {
	var vm = this;
	
	vm.openModal = openModal;

	openModal();
	
	function openModal () {
		ngDialog.open({
			template: 'src/app/templates/modalWindow.html',
			className: 'ngdialog-theme-plain i8-modal-editor',
			controller: 'modalEditorController',
			controllerAs: 'modalEditorCtrl'
		})
	}

}

