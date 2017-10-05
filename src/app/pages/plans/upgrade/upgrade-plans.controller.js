/**
 * Created by Reinchard on 9/14/2017.
 */

import {plans} from '../plans.js'

class UpgradePlansCtrl {
    constructor(AppConstants, $state, User, $scope, PaymentService, Notification) {
        'ngInject';
        this._$state = $state;
        this._$scope = $scope;
        this.isUpdate = $state.params.update;
        this.isCustomerUpdate = $state.params.updateCustomer;
        if (!this.isUpdate && !$state.params.plan && !this.isCustomerUpdate) {
            this._$state.go('landing.plans')
        }
        this.Notification = Notification;
        this.showLoader = false;
        this.currentUser = User.current;
        this.upgradetPlan = plans.filter((i) => i.title === 'DAVID')[0];
        this.upgrade = {};
        this.paymentService = PaymentService;
        this.getCustomer();
    }

    getCustomer() {
        this.paymentService.getCustomer()
            .then((res) => {
                this.customer = res;
                this.showLoader = false;
            }).catch(err => {
            this.showLoader = false;
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }

    create(valid) {
        if (this.isUpdate) {
            return this.upgradePlan(valid)
        } else if (this.isCustomerUpdate) {
            return this.updateCustomer(valid)

        } else {
            return this.createCustomer(valid)
        }
    }

    upgradePlan(valid) {
        if (valid) {
            this.showLoader = true;
            let data = {
                card: this.upgrade,
                planId: 'david'
            };
            this.paymentService.upgradeSubscribe(data)
                .then((res) => {
                    this.showLoader = false;
                    this._$state.go('app.billing')
                })
                .catch(err => {
                    _.each(err, (val, key) => {
                        this.Notification.error(val.fieldName);
                    });
                    this.showLoader = false;
                })
        }
    }

    createCustomer(valid) {
        if (valid) {
            this.showLoader = true;
            this.paymentService.createCustomer(this.upgrade)
                .then((res) => {
                    this.subscribeToPlan();
                }).catch(err => {
                this.showLoader = false;
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            })
        }
    }

    subscribeToPlan() {
        this.paymentService.createSubscribition(this.upgradetPlan.title.toLowerCase())
            .then((response) => {
                this.showLoader = false;
                this._$state.go('app.billing')
            }, err => {
                this.showLoader = false;
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            })
    }

    updateSubscription() {
        this.paymentService.updateSubscription({planId: this._$state.params.plan})
            .then((response) => {
                this._$state.go('app.billing');
                this.showLoader = false;
            }).catch(err => {
            this.showLoader = false;
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }

    updateCustomer(valid) {

        if (valid) {
            this.showLoader = true;

            this.paymentService.updateCustomer({card: this.upgrade})
                .then((res) => {
                    this.showLoader = false;
                }).catch((err) => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
                this.showLoader = false;

            })
        }
    }
}

export default UpgradePlansCtrl