class PageCtrl {
    constructor(AppConstants, $scope, $state, $stateParams,  EventBus, PagesService, PagesStore, $window, $anchorScroll, $location) {
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
            },

            err => {
                this.onFailedPage();
            }
        );
    }

    onFailedPage() {
        return this._$state.go('landing.error');
    }

    gotoAnchor(x) {
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };

}
export default PageCtrl;
