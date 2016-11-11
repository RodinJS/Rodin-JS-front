class PlansCrtl {

    constructor(AppConstants, User, $scope, stripeService, Validator, Error) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.plans = AppConstants.PLANS;

        this.formData = {};
        this.modals = [];
        this.stripeService = stripeService;
        this.customerCards = [];
        this.getCustomerInfo();
        this.initUser = this.initUser.bind(this);
        this.subscriptionError = this.subscriptionError.bind(this);
        this.initUser(User.current);

    }

    initUser(user) {
        console.log(user);
        this.currentUser = user;
        this.currentPlan = this.currentUser.role;
        this.subscription = this.currentUser.stripe && this.currentUser.stripe.subscriptionId  ? true : false;
        console.log(this.currentUser.stripe);
        console.log(this.currentUser.stripe.subscriptionId);
        console.log(this.subscription);
    }

    getCustomerInfo() {

        this.stripeService.getCustomer().then(
            customerInfo => {
                this.customerCards = _.map(customerInfo.sources.data, this.stripeService.mapCard);
            },
            err => {
                console.log(err);
                //this.$state.go('landing.error');
            }
        );
    }

    subscriptionSuccess(){

    }

    subscriptionError(error){
        console.log(error);
    }

    startSubscription() {
        this.stripeService.updateCustomer({default_source: this.selectedCard.id}).then(
            customer=> {

                if(this.subscription){
                    return this.stripeService.updateSubscription(this.selectedPlanId).then(this.initUser, this.subscriptionError)
                }

                return this.stripeService.createSubscription(this.selectedPlanId).then(this.initUser, this.subscriptionError)

            },
            error=> {
                console.log(error);
            });
    }

    unsubscribe() {
        this.stripeService.deleteSubscription().then(
            user=> {
                this.initUser(user);
            },
            error=> {
                console.log(error);
            }
        )
    }

    openSubscription(planId) {
        if (planId == 'Free') {
            return this.unsubscribe();
        }
        this.selectedPlanId = planId;
        this.modals['subscribe'] = true;
    }


    updateProfile(isValidForm = true) {
        console.log("currentUser", this.currentUser);
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
}

export default PlansCrtl;
