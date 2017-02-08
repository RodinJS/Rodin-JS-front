/**
 * Created by kh.levon98 on 13-Sep-16.
 */

function AppConfig(RestangularProvider, $stateProvider,  $locationProvider, $urlRouterProvider, AppConstants, NotificationProvider) {
    'ngInject';

    RestangularProvider.setBaseUrl(AppConstants.API);

    // In this case we are mapping the id of each element to the _id field.
    RestangularProvider.setRestangularFields({
        id: '_id',
    });

    if (AppConstants.env == 'prod' || AppConstants.env == 'dev' ||  AppConstants.env == 'stage') {
        $locationProvider.html5Mode(true);
    }

    $stateProvider
     .state('app', {
        abstract: true,
        templateUrl: 'layout/main/app-view.html',
        resolve: {
            auth: function (User) {
                return User.verifyPermission(true);
            },
        },
    })
     .state('landing', {
        abstract: true,
        templateUrl: 'layout/landing/landing-view.html',
        resolve: {
            auth: function (User) {
                return User.verifyAuth(false);
            },
        },
    });

    $urlRouterProvider.otherwise('/error');

    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 30,
        startRight: 30,
        verticalSpacing: 10,
        horizontalSpacing: 10,
        positionX: 'right',
        positionY: 'top',
        replaceMessage: false,
        maxCount: 5,
    });

}

export default AppConfig;
