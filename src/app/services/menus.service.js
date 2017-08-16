/**
 * Created by Reinchard on 8/15/2017.
 */
class Menus {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._Menus = Restangular.all('menus');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();

    }

    getList() {
        let Analyser = new this._Analyser();
        this._Menus.one('').get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

}

export default Menus;
