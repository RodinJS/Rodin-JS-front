function EditProjectOculusConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.editprojectOculus', {
        url: '/project/:projectId/oculus',
        controller: 'EditProjectOculusCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-oculus/editproject-oculus.html',
        title: 'Edit Project Oculus',
        pageClass: 'page-account new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectOculusConfig;
