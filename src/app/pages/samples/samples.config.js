function SamplesConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('landing.samples', {
        url: '/samples',
        controller: 'SamplesCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/samples/samples.html',
        title: 'Samples',
        resolve: {
            auth: function (User) {
                // return User.ensureAuthIs(true);
            },
        },
    });

}

export default SamplesConfig;
