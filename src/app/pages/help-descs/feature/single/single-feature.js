/**
 * Created by Reinchard on 7/26/2017.
 */

function SingleFeatureConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('landing.single-feature', {
            url: '/features/:id',
            controller: 'SingleFeatureCtrl',
            controllerAs: '$ctrl',
            template:'<single-desc type="features" id="$ctrl.id"></single-desc>',
            title: 'Question and Answer',
            showFooter: true,
            slug: 'qna',
            params: {
                page: null
            }
        });

}

export default SingleFeatureConfig;