function UserConfirmConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('landing.userconfirm', {
			url: '/confirm-user',
			controller: 'UserConfirmCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'pages/userConfirm/userConfirm.html',
			title: 'Username confirmation',
			pageClass: 'page-confirm'
		});

}

export default UserConfirmConfig;
