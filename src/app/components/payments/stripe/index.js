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

function stripeController($scope, $state, $stateParams, AppConstants, User){
    const vm = this;
    const userStripeData = User.current.stripe;
    Stripe.setPublishableKey(AppConstants.STRIPEKEY);

    vm.formSumbit = function(){
        let form = angular.element('#stripeFrom');
        console.log(form);
        Stripe.card.createToken(form, stripeResponseHandler);
    };



    function stripeResponseHandler(status, response) {

        // Grab the form:
        //var $form = $('#payment-form');

        if (response.error) { // Problem!

            // Show the errors on the form
            //$form.find('.payment-errors').text(response.error.message);
            //$form.find('button').prop('disabled', false); // Re-enable submission

        }
        else { // Token was created!

            // Get the token ID:
            var token = response.id;

            // Insert the token into the form so it gets submitted to the server:
            //$form.append($('<input type="hidden" name="stripeToken" />').val(token));

            console.log(token);

            // Submit the form:
            //$form.get(0).submit();

        }
    }
}

export default StripeDirective;