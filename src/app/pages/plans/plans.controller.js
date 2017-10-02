import {plans} from './plans.js'

class PlansCrtl {
    constructor(AppConstants, User, $state, $scope, Validator, Error, PaymentService, Notification) {
        'ngInject';
        this.showLoader = false;
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.formData = {};
        this._$scope = $scope;
        this._$state = $state;
        this.isUpgradable = false;
        this.paymentService = PaymentService;
        this.plans = plans;
        this.downgrade = true;
        this.upcomingInvoice = {};
        if (User.current) {
            $scope.$watch('User.current', (newUser) => {
                this.currentUser = newUser;
            });
            // this.getUserSubscription();
            this.getCustomer();
            this.upcomingInvoices();
            this.getSubscriptions()
        }

    }

    upcomingInvoices() {
        this.paymentService.upcomingInvoices()
            .then((res) => {
                this.upcomingInvoice = res;
            })
    }

    getCustomer() {
        this.showLoader = true;
        this.paymentService.getCustomer()
            .then((res) => {
                this.customer = res;
                this.showLoader = false;
                if (this.customer.sources) {
                    this.cardNumber = res.sources.data["0"].last4;
                    this.userSubscription = this.customer.subscriptions.data["0"] || null;
                    if (this.userSubscription) {
                        this.setModals();
                    }
                }
            }).catch(err => {
            _.each(err, (val, key) => {
                this.showLoader = false;
                this.Notification.error(val.fieldName);
            });
        })
    }

    setModals() {
        this.modals = {
            downgrade: {
                name: 'downgrade',
                active: false,
                title: 'Downgrade',
                description: `It’s ok <strong>David</strong>, sometimes we have to go back to tinkering and <strong>Thinking</strong>. You can still use David’s powers up to <strong>${this.timeConverter(this.userSubscription.current_period_end)}</strong>`,
                resolve: this.downgradePlan.bind(this),
                actions: {
                    success: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            upgrade: {
                name: 'upgrade',
                active: false,
                title: 'Upgrade',
                description: `Hey, you are still a <strong>David</strong>. We have not charged anything to your plastic as of now. The next charge will be on ${this.upcomingInvoice.next_payment_attempt ? this.timeConverter(this.upcomingInvoice.next_payment_attempt) : 'XX/XX/XXXX'}`,
                resolve: this.approveUpgrade.bind(this),
                actions: {
                    success: 'Confirm',
                    cancel: 'Cancel'
                }
            },
            active: {}
        };
    }

    getUserSubscription() {
        this.paymentService.getSubscription()
            .then((res) => {
                this.showLoader = false;
                // this.userSubscription = res;
                // this.setModals();
            }).catch(err => {
            this.showLoader = false;
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })

    }

    updateProfile(isValidForm = true) {
        if (!isValidForm) {
            return;
        }


        Validator.validate([
            {
                name: "avatar",
                value: scope.UserGeneralInfo.avatar,
                conditions: {}
            },
            {
                name: "name",
                value: scope.UserGeneralInfo.name,
                conditions: {
                    required: true,
                    pattern: scope.patterns.name
                }
            },
            {
                name: "state",
                value: scope.UserGeneralInfo.state,
                conditions: {}
            },
            {
                name: "country",
                value: scope.UserGeneralInfo.country,
                conditions: {}
            }
        ]);

        if (Validator.isValid()) {
            var data = Validator.getData();
            data.avatar = data.avatar || "";

            User.update(Validator.getData()).then(function (data) {
                Notification.success('Your profile successfully updated.');
            }, function (data) {
                Error.show(data, scope.profileForm, scope);
            });
        } else {
            Error.show(Validator.getErrors(), this.formData, scope);
        }

    }


    updatePlan(id) {
        if(this.isUpgradable) return this._$state.go('app.upgrade-plans', {plan: id, update: this.isUpgradable});
        if (!this.userSubscription) return this._$state.go('app.upgrade-plans', {plan: id});
        this.selectedPlan = id;
        if (this.selectedPlan === this.userSubscription.plan.id) {
            return false;
        }
        if (this.userSubscription.plan.id && this.userSubscription.plan.id !== 'thinker') {
            this.modals.active = this.modals.downgrade;
        }
        if (this.userSubscription.plan.id && this.userSubscription.plan.id !== 'david') {
            this.modals.active = this.modals.upgrade;
        }
        this.modals.active.active = !this.modals.active.active;
    }

    changePlane(type) {
        this.showLoader = true;
        this.modals.active = this.modals[type];
        this.modals.active.active = false;
        if (this.userSubscription.plan && this.userSubscription.plan.id && type === 'upgrade') {
            return this._$state.go('app.upgrade-plans', {plan: 'david', update: true})
        }
        this.paymentService.updateSubscription({planId: this.selectedPlan})
            .then((res) => {
                this.getCustomer()
            }).catch(err => {
            this.showLoader = false;
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }

    approveUpgrade() {
        this.changePlane('upgrade')
    }

    downgradePlan() {
        this.changePlane('downgrade')
    }


    getSubscriptions() {
        this.paymentService.getSubscriptions()
            .then((res) => {
                if (res.data[0] && res.data[0].status === 'canceled') {
                    this.isUpgradable = true;
                }
            })
    }

    timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate();
        let time = date + '/' + month + '/' + year;
        return time;
    }
}

export default PlansCrtl;
