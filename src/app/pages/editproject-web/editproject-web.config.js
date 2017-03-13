function EditProjectWebConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.editprojectWeb', {
      url: '/project/:projectId/web',
      controller: 'EditProjectWebCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'pages/editproject-web/editproject-web.html',
      title: 'EditProjectWeb',
      pageClass: 'page-account',
      resolve: {
        auth: function (User) {
          return User.ensureAuthIs(true);
        },
      },
    });
}

export default EditProjectWebConfig;
