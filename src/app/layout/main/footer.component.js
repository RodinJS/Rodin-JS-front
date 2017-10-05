class AppFooterCtrl {
    constructor(AppConstants, $scope, PagesStore, PagesService) {
        'ngInject';
        this.appName = AppConstants.appName;
        this._PagesStore = PagesStore;
        this._PagesService = PagesService;
        // Get today's date to generate the year
        this.date = new Date();

        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getFooterPagesList();
        });
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
    templateUrl: 'layout/main/footer.html',
};

export default AppFooter;
