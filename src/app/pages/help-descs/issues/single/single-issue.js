/**
 * Created by Reinchard on 7/26/2017.
 */

function SingleIssueConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.single-issue', {
            url: '/issue/:id',
            controller: 'SingleIssueCtrl',
            controllerAs: '$ctrl',
            template:'<single-desc type="issues" id="$ctrl.id"></single-desc>',
            title: 'Question and Answer',
            showFooter: true
        });

}

export default SingleIssueConfig;