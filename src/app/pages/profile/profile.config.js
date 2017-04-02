function ProfileConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('app.profile', {
        url: '/profile?token&id&socialEmail',
        controller: 'ProfileCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/profile/profile.html',
        title: 'Profile',
        pageClass: 'new',
        resolve: {
            auth: function (User) {
                return User.ensureAuthIs(true);
            },
        },
    });

}

export default ProfileConfig;
