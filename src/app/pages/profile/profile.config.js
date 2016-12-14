function ProfileConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.profile', {
			url: '/profile?token&id',
			controller: 'ProfileCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/profile/profile.html',
			title: 'Profile',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(true);
				}
			}
		});

}

export default ProfileConfig;
