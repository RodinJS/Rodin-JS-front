function EditProjectViveConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.editprojectVive', {
        url: '/project/:projectId/vive',
        controller: 'EditProjectViveCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-vive/editproject-vive.html',
        title: 'Edit Project Vive',
        pageClass: 'page-account',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectViveConfig;
