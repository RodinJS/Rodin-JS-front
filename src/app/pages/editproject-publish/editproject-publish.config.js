function EditProjectPublishConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.editprojectPublish', {
        url: '/project/:projectId/publish',
        controller: 'EditProjectPublishCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-publish/editproject-publish.html',
        title: 'Edit Project Publish',
        pageClass: 'page-account new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectPublishConfig;
