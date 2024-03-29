function ModulesConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('modules', {
            url: '/module/:id',
            controller: 'ModulesCtrl as $ctrl',
            templateUrl: 'pages/modules/modules.html',
            title: 'Modules',
        });
}

export default ModulesConfig;
