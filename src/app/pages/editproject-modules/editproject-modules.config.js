function EditProjectModulesConfig($stateProvider) {
    'ngInject';

    $stateProvider
      .state('app.editprojectModules', {
        url: '/project/:projectId/modules',
        controller: 'EditProjectModulesCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-modules/editproject-modules.html',
        title: 'EditProjectModules',
        pageClass: 'page-account',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectModulesConfig;
