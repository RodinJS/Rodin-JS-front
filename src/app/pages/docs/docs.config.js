function DocsConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.docs', {
			url: '/docs',
			controller: 'DocsCtrl as $ctrl',
			templateUrl: 'pages/docs/docs.html',
			title: 'Docs',
			pageClass:'',
		})
}

export default DocsConfig;
