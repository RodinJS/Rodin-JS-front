function HomeConfig($stateProvider) {
    'ngInject';

    $stateProvider
     .state('landing.home', {
        url: '/',
        controller: 'HomeCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'pages/home/home.html',
        title: 'Home',
        pageClass: 'home new',
        redirectToWhenAuthenticated: 'app.dashboard',
    });

}

export default HomeConfig;
