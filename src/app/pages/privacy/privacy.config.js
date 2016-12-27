function PrivacyConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.privacy', {
			url: '/terms',
			controller: 'PrivacyCtrl as $ctrl',
			templateUrl: 'pages/privacy/privacy.html',
			title: 'Privacy'
		})
}

export default PrivacyConfig;
