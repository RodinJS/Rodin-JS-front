/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Pages {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._Pages = Restangular.all('pages');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getList() {
        let Analyser = new this._Analyser();
        this._Pages.one('').get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    get(pageURL = null) {
        let Analyser = new this._Analyser();
        this._Pages.one('', pageURL).get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

}

export default Pages;
