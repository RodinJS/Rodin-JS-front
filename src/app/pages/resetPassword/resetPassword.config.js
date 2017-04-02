function UserConfirmConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('landing.resetpassword', {
			url: '/reset-password?t',
			controller: 'ResetPasswordCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/resetPassword/resetPassword.html',
			title: 'Reset password',
			pageClass: 'reset-password'
		});

}

export default UserConfirmConfig;
