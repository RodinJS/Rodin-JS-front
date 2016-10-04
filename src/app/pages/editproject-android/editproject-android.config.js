function EditProjectAndroidConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.editprojectAndroid', {
			url: '/project/:projectId/android',
			controller: 'EditProjectAndroidCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/editproject-android/editproject-android.html',
			title: 'EditProjectAndroid',
			pageClass: 'page-account',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});
}

export default EditProjectAndroidConfig;
