function AuthConfig($stateProvider) {
    'ngInject';

    $stateProvider

        .state('landing.login', {
            url: '/login',
            controller: 'AuthCtrl as $ctrl',
            templateUrl: 'pages/auth/auth.html',
            title: 'Sign in',
            redirectToWhenAuthenticated: 'app.dashboard',
            pageClass: 'login-register',
            showFooter: true,
            resolve: {
                auth: function (User, $state, $timeout) {
                    return User.ensureAuthIs(false);
                },
            },
        })

        .state('landing.register', {
            url: '/register',
            controller: 'AuthCtrl as $ctrl',
            templateUrl: 'pages/auth/auth.html',
            title: 'Sign up',
            redirectToWhenAuthenticated: 'app.dashboard',
            pageClass: 'login-register',
            showFooter: true,
            resolve: {
                auth: function (User) {
                    return User.ensureAuthIs(false);
                },
            },
        });

};

export default AuthConfig;
