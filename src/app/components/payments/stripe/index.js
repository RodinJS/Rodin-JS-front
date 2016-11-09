/**
 * Created by xgharibyan on 10/29/16.
 */
function StripeDirective() {
    'ngInject';

    const ControllerInjector = [
        '$scope',
        '$state',
        '$stateParams',
        'AppConstants',
        'User',
        'stripeService',
        stripeController
    ];

    return {
        restrict: 'AE',
        templateUrl: 'components/payments/stripe/index.html',
        bindToController: true,
        controllerAs: 'vm',
        //replace: true,
        controller: ControllerInjector
    };
}

function stripeController($scope,
                          $state,
                          $stateParams,
                          AppConstants,
                          User,
                          stripeService) {
    const vm = this;

    Stripe.setPublishableKey(AppConstants.STRIPEKEY);

    stripeService.getCostumer().then(init, onError);


    vm.formSumbit = function () {
        let form = angular.element('#stripeFrom');
        vm.submitInProgress = true;
        Stripe.card.createToken(form, stripeResponseHandler);
    };

    vm.removeCard = function (index, cardId) {
        vm.removableCardIndex = index;
        stripeService.deleteCard(cardId).then(onSuccess, onError);
    };

    function init(customer) {
        vm.cardForm = {};
        if (customer && !customer.deleted) {
            vm.customer = customer;
            vm.customerCards = _.map(customer.sources.data, mapCard);
        }

    }

    function onError(error) {
        vm.submitInProgress = false;
        console.log(error);
    }

    function mapCard(card){
        card.brand = card.brand.toLowerCase();
        switch(card.brand){
            case 'american express' : card.brand = 'amex'; break;
            case 'diners club' : card.brand = 'diners-club'; break;
        }
        return _.pick(card, ['brand', 'exp_month', 'exp_year', 'last4', 'id']);
    }

    function onSuccess(success) {

        if (_.isObject(success)) {
            let card = success.sources ? success.sources.data : success;
            if (!vm.customerCards) vm.customerCards = [];
            vm.customerCards.push(mapCard(card));
        }
        else{
            vm.customerCards.splice(vm.removableCardIndex, 1);
            delete vm.removableCardIndex;
        }
        vm.submitInProgress = false;
        resetForm();
    }

    function resetForm(){
        vm.cardForm = {};
        vm.stripe.$setPristine();
        vm.stripe.$setUntouched();
        vm.stripe['number'].focused = false;
        vm.stripe['exp_month'].focused = false;
        vm.stripe['exp_year'].focused = false;
        vm.stripe['cvc'].focused = false;
    }

    function stripeResponseHandler(status, response) {

        vm.stripe['number'].$invalid = false;
        vm.stripe['exp_month'].$invalid = false;
        vm.stripe['exp_year'].$invalid = false;
        vm.stripe['cvc'].$invalid = false;

        if (response.error) { // Problem!
            vm.stripe[response.error.param].$invalid = true;
            vm.stripe[response.error.param].$valid = false;
            vm.submitInProgress = false;
            $scope.$apply();
        }
        else {
            const token = response.id;

            if (vm.customer)
                stripeService.createCard({stripeToken: token}).then(onSuccess, onError);
            else
                stripeService.createCustomer({stripeToken: token}).then(onSuccess, onError);
        }
    }
}

export default StripeDirective;