/**
 * Created by Reinchard on 9/15/2017.
 */

class PaymentService {
    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._PaymentCustomer = Restangular.all('payments/stripe/customer');
        this._PaymentSubscribe = Restangular.all('payments/stripe/subscription');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getCustomer() {
        return this._PaymentCustomer.post('',{stripeToken: 'Barev GRIG'});
    }
}

export default PaymentService