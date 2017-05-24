function FaqConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('landing.about', {
            url: '/about',
            controller: 'AboutCtrl as $ctrl',
            templateUrl: 'pages/about/about.html',
            title: 'About us',
            pageClass: 'space-back about-us',
            showFooter: true,
        });
}

export default FaqConfig;