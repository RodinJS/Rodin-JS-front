
class FaqCtrl {
    constructor($scope, $state, PagesService, Notification) {
        'ngInject';

        this._PagesService = PagesService;
        this._Notification = Notification;
        this._$scope = $scope;
        this._$state = $state;
	    this.faqs = [];
        this._PagesService.getFAQ()
            .then(list=> {
                this.faqs = list;
            })
            .catch(err=> {
                _.each(err, (val, key) => {
                    this._Notification.error(val.fieldName);
                });
                //this._$state.go('landing.error');
            });
    }
}
export default FaqCtrl;
