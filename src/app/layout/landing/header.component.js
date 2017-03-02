class AppHeaderCtrl {
    constructor(AppConstants, $scope, $state, $stateParams, $location, PagesService, PagesStore, EventBus) {
        'ngInject';
        this._$state = $state;
        this._$scope = $scope;
        this._PagesService = PagesService;
        this._PagesStore = PagesStore;
        this._$stateParams = $stateParams;
        this._$location = $location;
        this.eventBus = EventBus;
        this.appName = AppConstants.appName;

        this._PagesStore.subscribeAndInit($scope, () => {
            this.pagesList = this._PagesStore.getPagesList();
            if (this.pagesList.length <= 0 && !this.try) {
                this.try = true;
                return this.getPagesList();
            }

            if (this.pagesList.length > 0) {
                this.pagesSection1 = _.slice(this.pagesList, 0, 3);
                this.pagesSection2 = _.slice(this.pagesList, 3, this.pagesList.length);

            }

        });

    }

    scrollToSignUp() {
        if (this.emailFocused) return;
        const _this = this;
        $('html,body').animate({
            scrollTop: $('.form').offset().top - 100,
        }, {
            duration: 500,
            complete: function () {
                $('#emailControl').focus();
                _this._$scope.$broadcast('notificationBoxTrigger', {});
                _this._$scope.$apply();
            },
        });
    }

    getPagesList() {
        this._PagesService.getList().then(
            pagesList => {
                this.eventBus.emit(this.eventBus.pages.SET, pagesList);
            },

            err => {
                console.log(err);
            }
        );
    }
}

let AppHeader = {
    controller: AppHeaderCtrl,
    templateUrl: 'layout/landing/header.html',
};

export default AppHeader;
