/**
 * Created by Reinchard on 9/14/2017.
 */

class UpgradePlansCtrl {
    constructor(AppConstants, User, $scope, PaymentService){
        'ngInject';
        this.upgrade = {};
        this.paymentService = PaymentService;
        this.getCustomer()
    }

    getCustomer() {
        this.paymentService.getCustomer()
            .then((res) => {
            console.log(res)
            })
    }
}
export default UpgradePlansCtrl