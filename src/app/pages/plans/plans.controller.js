class PlansCrtl {
    constructor(AppConstants, User, $scope, stripeService, Validator, Error) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this.formData = {};
        this.modals = [];
        this.stripeService = stripeService;
        this.customerCards = [];
        this.getCustomerInfo();


    }

    getCustomerInfo() {

        this.stripeService.getCustomer().then(customerInfo => {
                console.log(customerInfo);
                this.customerCards  = _.map(customerInfo.sources.data, this.stripeService.mapCard);
            },
            err => {
                console.log(err);
                //this.$state.go('landing.error');
            }
        )

    }

    startSubscription(){
        this.stripeService.updateCustomer({default_source:this.selectedCard.id}).then(customer=>{

             this.stripeService.createSubscription('some-plan').then(subscription=>{
                     console.log(subscription);
                 },
             error=>{
                 console.log(error);
             })

        },
        error=>{

        });
    }

    openSubscription(name){
      this.modals[name] = true;
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
