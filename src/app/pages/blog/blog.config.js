/**
 * Created by Reinchard on 6/26/2017.
 */
function BlogConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('landing.blog', {
            url: '/blog',
            controller: 'BlogCtrl as $ctrl',
            templateUrl: 'pages/blog/blog.html',
            title: 'Blog',
            pageClass: 'space-back',
            showFooter: true,
        });
}

export default BlogConfig;
