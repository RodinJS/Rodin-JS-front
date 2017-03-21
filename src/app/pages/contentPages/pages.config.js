function PageConfig($stateProvider) {
    'ngInject';
    $stateProvider
     .state('landing.pages', {
        url: '/page/:pageURL',
        controller: 'PagesCtrl as $ctrl',
        templateUrl: 'pages/contentPages/pages.html',
        pageClass: 'new space-back',
        showFooter: true,
    });
}

export default PageConfig;
