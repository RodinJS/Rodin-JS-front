function EditProjectViveConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.editprojectVive', {
        url: '/project/:projectId/vive',
        controller: 'EditProjectViveCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-vive/editproject-vive.html',
        title: 'EditProjectVive',
        pageClass: 'page-account new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectViveConfig;
