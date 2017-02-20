function DiscoverConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.discover', {
			url: '/howitworks',
			controller: 'DiscoverCtrl as $ctrl',
			templateUrl: 'pages/discover/discover.html',
			title: 'Discover',
            pageClass:'',
        })
}

export default DiscoverConfig;
