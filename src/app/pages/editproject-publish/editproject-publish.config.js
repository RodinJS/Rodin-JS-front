function EditProjectPublishConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.editprojectPublish', {
        url: '/project/:projectId/publish',
        controller: 'EditProjectPublishCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-publish/editproject-publish.html',
        title: 'EditProjectpublish',
        pageClass: 'page-account',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectPublishConfig;
