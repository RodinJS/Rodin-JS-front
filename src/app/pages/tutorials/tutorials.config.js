function TutorialsConfig($stateProvider) {
	'ngInject';
	$stateProvider
		.state('landing.tutorials', {
			url: '/tutorials',
			controller: 'TutorialsCtrl as $ctrl',
			templateUrl: 'pages/tutorials/tutorials.html',
			title: 'Tutorials'
		})
}

export default TutorialsConfig;