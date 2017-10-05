class AppFooterCtrl {
    constructor(AppConstants, $scope, PagesService, PagesStore, EventBus) {
        'ngInject';
        this.appName = AppConstants.appName;
        this._PagesStore = PagesStore;
        this._PagesService = PagesService;
        // Get today's date to generate the year
        this.date = new Date();
        this.eventBus = EventBus;
        this.pagesList = [];
        this.getPagesList()

    }
    getPagesList() {
        this._PagesService.getList().then(
            pagesList => {
                this.pagesList = pagesList[0].values.filter((pages) => pages.putOnFooter);
            },

            err => {
                console.log(err);
            }
        );
    }
}

let AppFooter = {
    controller: AppFooterCtrl,
    templateUrl: 'layout/landing/footer.html',
};

export default AppFooter;
