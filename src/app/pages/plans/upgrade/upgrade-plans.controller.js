/**
 * Created by Reinchard on 9/14/2017.
 */

import {plans} from '../plans.js'

class UpgradePlansCtrl {
    constructor(AppConstants, $state, User, $scope, PaymentService) {
        'ngInject';
        this.showLoader = false;
        this.currentUser = User.current;
        this.upgradetPlan = plans.filter((i) => i.title === 'DAVID')[0];
        this.upgrade = {};
        this.paymentService = PaymentService;
        // this.getCustomer()
    }

    getCustomer() {
        this.paymentService.getCustomer()
            .then((res) => {
                this.showLoader = false;
            })
    }

    createCustomer(valid) {
        if (valid) {
            this.showLoader = true;
            this.paymentService.createCustomer(this.upgrade)
                .then((res) => {
                    this.subscribeToPlan()
                })
        }
    }

    subscribeToPlan() {
        this.paymentService.createSubscribition(this.upgradetPlan.title.toLowerCase())
            .then((response) => {
                this.showLoader = false;
            }, err => console.log(err))
    }
}

export default UpgradePlansCtrl