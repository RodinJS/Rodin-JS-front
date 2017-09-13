/**
 * Created by Reinchard on 7/26/2017.
 */

function FeatureConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.feature', {
            url: '/features',
            controller: 'FeatureCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'pages/help-descs/feature/feature.html',
            title: 'Question and Answer',
            showFooter: true,
            slug: 'qna',
            params: {
                page: null,
                tag: null,

            }
        });

}

export default FeatureConfig;
