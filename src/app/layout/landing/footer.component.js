class AppFooterCtrl {
    constructor(AppConstants, $scope, PagesStore) {
        'ngInject';
        this.appName = AppConstants.appName;
        this._PagesStore = PagesStore;

        // Get today's date to generate the year
        this.date = new Date();

        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getFooterPagesList();
        });

    }
}

let AppFooter = {
    controller: AppFooterCtrl,
    templateUrl: 'layout/landing/footer.html',
};

export default AppFooter;
