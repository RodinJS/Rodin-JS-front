/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Modules {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._Modules = Restangular.all('modules');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getList(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one('').get(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getMyModules(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one('mine').get(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    update(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one('mine').customPUT(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    subscribe(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one('subscribe').customPOST(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    unsubscribe(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one(`subscribe?moduleId=${fields.moduleId}`).customDELETE().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    assign(fields = {}) {
        let Analyser = new this._Analyser();
        this._Modules.one('assign').customPOST(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

}

export default Modules;
