function EditProjectWebConfig($stateProvider) {
    'ngInject';

    $stateProvider
      .state('app.editprojectWeb', {
        url: '/project/:projectId/web',
        controller: 'EditProjectWebCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/editproject-web/editproject-web.html',
        title: 'Edit Project Web',
        pageClass: 'page-account new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });
}

export default EditProjectWebConfig;
