/**
 * Created by Reinchard on 7/25/2017.
 */
function QuestionConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.question', {
            url: '/questions',
            controller: 'QuestionCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'pages/help-descs/question/question.html',
            title: 'Question and Answer',
            showFooter: true
        })

}

export default QuestionConfig;
