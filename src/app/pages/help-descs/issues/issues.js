/**
 * Created by Reinchard on 7/26/2017.
 */

function IssuesConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.issues', {
            url: '/issues',
            controller: 'IssuesCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'pages/help-descs/issues/issues.html',
            title: 'Issues',
            showFooter: true,
            slug: 'qna'
        });

}

export default IssuesConfig;
