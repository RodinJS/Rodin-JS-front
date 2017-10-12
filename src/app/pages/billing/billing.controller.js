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
                    this.plan = plans.filter(plan => plan.id === this.customer.subscriptions.data["0"].plan.id)[0];
                } else {
                    this.plan = plans[0];
                }
            })
            .catch(() => {
                this.showLoader = false;
            })
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
