class PageCtrl {
    constructor(AppConstants, $scope, $state, $stateParams,  EventBus, PagesService, PagesStore) {
        'ngInject';

        this.pageURL = $stateParams.pageURL;

        this._$state = $state;
        this._$stateParams = $stateParams;
        this._EventBus = EventBus;
        this._PagesService = PagesService;
        this._PagesStore = PagesStore;


        if (!this.pageURL) return this.onFailedPage();

        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getPagesList();
            if (this.pagesList.length > 0) {
                if (!_.find(this.pagesList, (page)=> page.slug === this.pageURL)) {
                    return this.onFailedPage();
                }

                this.page = this._PagesStore.getPage(this.pageURL);
                console.log(this.page);
                if (!this.page) return this.getPageContent();
            }
        });
    }

    getPageContent() {
        this._PagesService.get(this.pageURL).then(
            page => {
                this._EventBus.emit(this._EventBus.pages.SET_CONTENT, page);
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
