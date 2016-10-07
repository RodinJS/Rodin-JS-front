function EditProjectOculusConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.editprojectOculus', {
			url: '/project/:projectId/oculus',
			controller: 'EditProjectOculusCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/editproject-oculus/editproject-oculus.html',
			title: 'EditProjectOculus',
			pageClass: 'page-account',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});
}

export default EditProjectOculusConfig;
