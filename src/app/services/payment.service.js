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
        this._PaymentSubscriptions = Restangular.all('payments/stripe/subscriptions');
        this._PaymentCharges = Restangular.all('payments/stripe/charges');
        this._PaymentToken = Restangular.all('payments/stripe/token');
        this._PaymentInvoices = Restangular.all('payments/stripe/invoices');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getCustomer() {
        let Analyser = new this._Analyser();
        this._PaymentCustomer.customGET('').then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    createCustomer(upgrade) {
        let Analyser = new this._Analyser();
        this._PaymentCustomer.one('').customPOST(upgrade).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    updateCustomer(data) {
        let Analyser = new this._Analyser();
        this._PaymentCustomer.one('').customPUT(data).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    deleteCustomer() {
        let Analyser = new this._Analyser();
        this._PaymentCustomer.one('').customDELETE().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    createSubscribition(plan) {
        let Analyser = new this._Analyser();
        this._PaymentSubscribe.one('').customPOST({planId: plan}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getSubscription() {
        let Analyser = new this._Analyser();
        this._PaymentSubscribe.one('').get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    updateSubscription(data) {
        let Analyser = new this._Analyser();
        this._PaymentSubscribe.one('').customPUT(data).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    deleteSubscription() {
        let Analyser = new this._Analyser();
        this._PaymentSubscribe.one('').customDELETE().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getCharges() {
        let Analyser = new this._Analyser();
        this._PaymentCharges.one('').customGET().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    createToken(card) {
        let Analyser = new this._Analyser();
        this._PaymentToken.one('').customPOST(card).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getInvoices() {
        let Analyser = new this._Analyser();
        this._PaymentInvoices.one('').customGET().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    upgradeSubscribe(data) {
        let Analyser = new this._Analyser();
        this._PaymentSubscribe.one('/upgrade').customPUT(data).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    upcomingInvoices() {
        let Analyser = new this._Analyser();
        this._PaymentInvoices.one('/upcoming').customGET().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getSubscriptions() {
        let Analyser = new this._Analyser();
        this._PaymentSubscriptions.one('').customGET().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }
}

export default PaymentService