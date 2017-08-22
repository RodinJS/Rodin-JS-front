class PageCtrl {
    constructor(AppConstants, $scope, $state, $stateParams, EventBus, PagesService, PagesStore, $window) {
        'ngInject';

        $window.scrollTo(0, 0);
        this.pageURL = $stateParams.pageURL;
        this._$scope = $scope;
        this._$state = $state;
        this._$stateParams = $stateParams;
        this._EventBus = EventBus;
        this._PagesService = PagesService;
        this._PagesStore = PagesStore;

        if (!this.pageURL) return this.onFailedPage();
        this.getPageContent();
    }

    getPageContent() {
        this._PagesService.get(this.pageURL).then(
            page => {
                this.page = page;
                setTimeout(()=> {
                    angular.element('.docs-iframe')[0].style.height =  (angular.element('.docs-iframe')[0].contentWindow.document.body.scrollHeight - 70) + 'px'
                })
            },

            err => {
                this.onFailedPage();
            }
        );
    }

    onFailedPage() {
        return this._$state.go('landing.error');
    }
}

export default PageCtrl;
