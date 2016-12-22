/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Project {

    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, Analyser) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._Analyser = Analyser;

        this._Projects = Restangular.all('project');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();


    }

    get(projectId = null, fields) {
        let Analyser = new this._Analyser();
        this._Projects.one(projectId).get(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getList(fields = {}) {
        let Analyser = new this._Analyser();
        this._Projects.one('').get(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    getPublishedHistory(projectId = null){
        let Analyser = new this._Analyser();
        this._Projects.one('publish/' + projectId).get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    publish(projectId = null) {
        let Analyser = new this._Analyser();
        this._Projects.one('publish/' + projectId).post().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    rollBack(projectId = null, fields = null) {
        let Analyser = new this._Analyser();
        this._Projects.one('publish/rollback/' + projectId).customPOST(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    updatePublish(projectId = null) {
        let Analyser = new this._Analyser();
        this._Projects.one('publish/' + projectId).put().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    unPublish(projectId = null) {
        let Analyser = new this._Analyser();
        this._Projects.one('publish/' + projectId).remove().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    transpile(projectId = null) {
        let Analyser = new this._Analyser();
        this._Projects.one(projectId + '/build/transpile').get().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    update(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();
        this._Projects.one(projectId).customPUT(Object.filterByKeys(fields, ['name', 'description', 'thumbnail', 'tags', 'displayName']))
            .then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    create(fields = {}) {
        let Analyser = new this._Analyser();
        this._Projects.post(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    remove(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();
        this._Projects.one(projectId).remove(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    toggleStatus(projectId = null, status = 'false') {
        let Analyser = new this._Analyser();
        this._Projects.one('pp').one(projectId).customPOST({status: status}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    download(projectId = "", target = "") {
        let Analyser = new this._Analyser();
        this._Projects.one(projectId).one('download').one(target).customGET().then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }
}

export default Project;