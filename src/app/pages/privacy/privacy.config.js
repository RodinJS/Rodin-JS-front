function PrivacyConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.privacy', {
			url: '/terms',
			controller: 'PrivacyCtrl as $ctrl',
			templateUrl: 'pages/privacy/contacts.html',
			title: 'Privacy',
            pageClass:'new',
        })
}

export default PrivacyConfig;
