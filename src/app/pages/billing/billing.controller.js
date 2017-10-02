import {plans} from "../plans/plans";

class BillingCrtl {
    constructor(AppConstants, User, $scope, Validator, Error, PaymentService, Notification) {
        'ngInject';
        this.showLoader = true;
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.formData = {};
        this.billingHistory = [];
        $scope.$watch('User.current', (newUser) => {
            this.currentUser = newUser;
        });
        this.paymentService = PaymentService;
        this.getCustomer();
        this.getCharges();
        this.getInvoices()
    }

    getCharges() {
        this.paymentService.getCharges()
            .then((res) => {
                if (res) {
                    this.billingHistory = res;
                }
            }).catch((err) => {
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }

    getCustomer() {
        this.paymentService.getCustomer()
            .then((res) => {
                this.showLoader = false;
                this.customer = res;
                if (this.customer.subscriptions && this.customer.subscriptions.data.length > 0) {
                    this.plan = plans.filter(plan => plan.title.toLowerCase() === this.customer.subscriptions.data["0"].plan.id)[0];
                } else {
                    this.plan = plans[0];
                }
            })
            .catch(() => {
                this.showLoader = false;
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

    getInvoices() {
        this.paymentService.getInvoices()
            .then((res) => {
                this.invoices = res;
            }).catch((err) => {
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }
}

export default BillingCrtl;
