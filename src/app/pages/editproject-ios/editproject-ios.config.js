function EditProjectIosConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.editprojectIos', {
			url: '/project/:projectId/ios',
			controller: 'EditProjectIosCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/editproject-ios/editproject-ios.html',
			title: 'Edit Project Ios',
			pageClass: 'page-account new',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});
}

export default EditProjectIosConfig;
