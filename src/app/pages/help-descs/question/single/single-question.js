/**
 * Created by Reinchard on 7/26/2017.
 */

function SingleQuestionConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.single-question', {
            url: '/questions/:id',
            controller: 'SingleQuestionCtrl',
            controllerAs: '$ctrl',
            template:'<single-desc type="questions" id="$ctrl.id"></single-desc>',
            title: 'Question and Answer',
            showFooter: true,
            slug: 'qna',
            params: {
                page: null
            }
        });

}

export default SingleQuestionConfig;