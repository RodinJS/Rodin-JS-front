class Stripe {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;

        this._Stripe = Restangular.all('payments/stripe/');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    getCostumer() {
        this.deferred = this._$q.defer();
        this._Stripe.one('customer').get().then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    createCustomer(fields) {
        this.deferred = this._$q.defer();
        this._Stripe.one('customer').customPOST(fields).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    createCard(fields) {
        this.deferred = this._$q.defer();
        this._Stripe.one('card').customPOST(fields).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    deleteCard(cardId) {
        this.deferred = this._$q.defer();
        this._Stripe.one('card?cardId='+cardId).remove().then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    onSuccess(result) {
        this._Validator.validateHTTP(result);
        if (this._Validator.isValidHTTP()) {
            let response = this._Validator.getDataHTTP();
            this.deferred.resolve(response);
        } else {
            this.deferred.reject(this._Validator.getErrorsHTTP());
        }
        delete this.deferred;
    }

    onError(result) {
        this._Validator.validateHTTP(result.data);
        this.deferred.reject(this._Validator.getErrorsHTTP());
        delete this.deferred;
    }


}

export default Stripe;