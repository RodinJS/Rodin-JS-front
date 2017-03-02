function ProjectConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.project', {
        url: '/project',
        controller: 'ProjectCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/project/project.html',
        title: 'Project',
        pageClass: 'new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });

}

export default ProjectConfig;
