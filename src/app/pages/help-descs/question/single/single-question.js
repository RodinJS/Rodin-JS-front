/**
 * Created by Reinchard on 7/26/2017.
 */

function SingleQuestionConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.single-issue', {
            url: '/questions/:id',
            controller: 'SingleQuestionCtrl',
            controllerAs: '$ctrl',
            template:'<single-desc type="questions" id="$ctrl.id"></single-desc>',
            title: 'Question and Answer',
            showFooter: true
        });

}

export default SingleQuestionConfig;