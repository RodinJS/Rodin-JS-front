import {plans} from './plans.js'

class PlansCrtl {
    constructor(AppConstants, User, $scope, Validator, Error, PaymentService) {
        'ngInject';
        this.showLoader = false;
        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.formData = {};
        this._$scope = $scope;
        this.paymentService = PaymentService;
        this.plans = plans;
        this.downgrade = true;
        if (User.current) {
            $scope.$watch('User.current', (newUser) => {
                this.currentUser = newUser;
                console.log(this.currentUser)
            });
            this.getUserSubscription();
            this.getCustomer();
        }

    }

    getCustomer() {
        this.paymentService.getCustomer()
            .then((res) => {
                this.customer = res;
                if (this.customer.sources) {
                    this.cardNumber = res.sources.data["0"].last4;
                }
                this.setModals();
            })
    }

    setModals() {
        this.modals = {
            downgrade: {
                active: false,
                title: 'Downgrade',
                description: `Are you sure you want to downgrade your profile from <strong>DAVID</strong> to <strong>THINKER</strong>?`
            },
            upgrade: {
                active: false,
                title: 'Upgrade',
                description: `Changing plan from <strong>THINKER</strong> to <strong>DAVID</strong>. <br> Your card ending in <strong>${this.cardNumber}</strong> will be charged <strong>$50</strong>. <br>
Please confirm.`
            }
        };
    }

    getUserSubscription() {
        this.paymentService.getSubscription()
            .then((res) => {
                this.showLoader = false;
                this.userSubscription = res;
            }).catch(err => this.showLoader = false)
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
        this.selectedPlan = id;
        if (this.selectedPlan === this.userSubscription.plan.id) {
            return false
        }
        if (this.selectedPlan !== this.userSubscription.plan.id && this.userSubscription.plan.id === 'thinker') {
            this.modals.upgrade.active = !this.modals.upgrade.active;
        } else {
            this.modals.downgrade.active = !this.modals.downgrade.active;
        }
    }

    changePlane(type) {
        this.showLoader = true;
        this.modals[type].active = false;
        this.paymentService.updateSubscription(this.selectedPlan)
            .then((res) => {
                this.getUserSubscription()
            })
    }

    approveUpgrade() {
        this.changePlane('upgrade')
    }

    downgradePlan() {
        this.changePlane('downgrade')
    }
}

export default PlansCrtl;
