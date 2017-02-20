function FaqConfig($stateProvider) {
    'ngInject';
    $stateProvider
     .state('landing.betaAgreement', {
        url: '/beta-agreement',
        controller: 'BetaCtrl as $ctrl',
        templateUrl: 'pages/betaAgreement/beta.html',
        title: 'Beta Agreement',
        pageClass: 'beta-aggrement new',
    });
}

export default FaqConfig;
