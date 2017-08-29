/**
 * Created by Reinchard on 7/26/2017.
 */
class HelpDescService {
    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;
        this.history = {};
        this._Support = Restangular.all('support');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
        this.resetValues = this.resetValues.bind(this);
    }

    getList(type = '', page = 1) {
        let Analyser = new this._Analyser();
        this._Support.one(`/search/${type}?page=${page}`).get({}).then(Analyser.resolve, Analyser.reject);
        // this._Support.one(`/${type}?page=${page}`).get({}).then(Analyser.resolve, Analyser.reject);
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

    updateThread(conversationId, data) {
        let Analyser = new this._Analyser();
        this._Support.one(`/thread/${conversationId}`).customPUT(JSON.stringify(data,undefined, undefined,
            { 'Content-Type': 'application/x-www-form-urlencoded' })).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getConversation(type, id) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).get({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    vote(type, id, vote, voteType) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).customPUT({vote, voteType}).then(Analyser.resolve, Analyser.reject);
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

    resetValues() {
        this.history.post = null;
        this.history.tags = null;
    }

    updateConversation(type, id, data) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).customPUT(JSON.stringify(data,undefined, undefined,
            { 'Content-Type': 'application/x-www-form-urlencoded' })).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    deleteConversation(type, id) {
        let Analyser = new this._Analyser();
        this._Support.one(`/conversation/${type}/${id}`).customDELETE().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }
}

export default HelpDescService;