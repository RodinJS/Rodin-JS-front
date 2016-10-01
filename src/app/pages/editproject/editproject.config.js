function EditProjectConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.editproject', {
			url: '/project/:projectId',
			controller: 'EditProjectCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/editproject/editproject.html',
			title: 'EditProject',
			pageClass: 'page-settings',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});

}

export default EditProjectConfig;
