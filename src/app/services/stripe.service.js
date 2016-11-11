class Stripe {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, $window) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;

        this._Stripe = Restangular.all('payments/stripe/');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        $window.Stripe.setPublishableKey(AppConstants.STRIPEKEY);

    }

    createToken(form, cb){
        $window.Stripe.card.createToken(form, cb);
    }

    mapCard(card){
        card.brand = card.brand.toLowerCase();
        switch(card.brand){
            case 'american express' : card.brand = 'amex'; break;
            case 'diners club' : card.brand = 'diners-club'; break;
        }
        return _.pick(card, ['brand', 'exp_month', 'exp_year', 'last4', 'id']);
    }

    getCustomer() {
        this.deferred = this._$q.defer();
        this._Stripe.one('customer').get().then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    updateCustomer(fields) {
        this.deferred = this._$q.defer();
        this._Stripe.one('customer').put(fields).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    createCustomer(fields) {
        this.deferred = this._$q.defer();
        this._Stripe.one('customer').customPOST(fields).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    createSubscription(planId){
        this.deferred = this._$q.defer();
        this._Stripe.one('subscription').customPOST({planId:planId}).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }
    updateSubscription(planId){
        this.deferred = this._$q.defer();
        this._Stripe.one('subscription').customPOST({planId:planId}).then(this.onSuccess, this.onError);
        return this.deferred.promise;
    }

    deleteSubscription(subscriptionI){
        this.deferred = this._$q.defer();
        this._Stripe.one('subscription').remove().then(this.onSuccess, this.onError);
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
