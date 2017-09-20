/**
 * Created by Reinchard on 9/14/2017.
 */
function UpgradePlansConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.upgrade-plans', {
            url: '/profile/plans/upgrade',
            controller: 'UpgradePlansCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'pages/plans/upgrade/upgrade-plans.html',
            title: 'Profile',
            showFooter: true,
            params: {
              plan: null
            },
            resolve: {
                auth: function (User) {
                    return User.ensureAuthIs(true);
                }
            }
        })
}

export default UpgradePlansConfig;
