function DiscoverConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.discover', {
			url: '/discover',
			controller: 'DiscoverCtrl as $ctrl',
			templateUrl: 'pages/discover/discover.html',
			title: 'Discover'
		})
}

export default DiscoverConfig;
