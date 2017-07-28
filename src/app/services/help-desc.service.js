/**
 * Created by Reinchard on 7/26/2017.
 */
class HelpDescService {
    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._Support = Restangular.all('support');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getList(type = '', page = 1) {
        let Analyser = new this._Analyser();
        this._Support.one(`/search/${type}?page=${page}`).get({}).then(Analyser.resolve, Analyser.reject);
        // this._Support.one(`/${type}`).get({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    createQuestion(type = '', data) {
        let Analyser = new this._Analyser();
        this._Support.one(`/${type}`).customPOST(data).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    createQuestionThread(conversationId, data) {
        let Analyser = new this._Analyser();
        this._Support.one(`/thread/${conversationId}`).customPOST(data).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getConversation(type, id) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).get({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    vote(type, id, vote) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).customPUT({vote}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getTags(type='') {
        let Analyser = new this._Analyser();
        this._Support.one(`/tags/${type}`).get({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    searchConversations(type) {
        let Analyser = new this._Analyser();
        this._Support.one(`/search/${type}`).get({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }
}

export default HelpDescService;