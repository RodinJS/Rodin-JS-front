/**
 * Created by Reinchard on 6/26/2017.
 */

class BlogCtrl {
    constructor($scope, $state, PagesService, Notification) {
        'ngInject';

        this._PagesService = PagesService;
        this._Notification = Notification;
        this._$scope = $scope;
        this._$state = $state;
        // this._PagesService.getFAQ()
        //     .then(list=> {
        //         this.faqs = list;
        //     })
        //     .catch(err=> {
        //         _.each(err, (val, key) => {
        //             this._Notification.error(val.fieldName);
        //         });
        //         //this._$state.go('landing.error');
        //     });
    }
}
export default BlogCtrl;
