/**
 * Created by Reinchard on 7/25/2017.
 */
function QuestionConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.question', {
            url: '/question',
            controller: 'QuestionCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'pages/q&a/question.html',
            title: 'Question and Answer',
            resolve: {
                auth: function (User) {
                    return User.ensureAuthIs(true);
                },
            },
        });

}

export default QuestionConfig;
