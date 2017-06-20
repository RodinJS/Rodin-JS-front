// jscs:disable
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
        this._ProjectDomains = Restangular.all('domains');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();


    }

    setDomain(fields = {}) {
        let Analyser = new this._Analyser();
        this._ProjectDomains.post(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    deleteDomain(projectId, fields = {}) {
        let Analyser = new this._Analyser();
        let deletingDomain = fields.domain;
        fields.domain = '';
        this._Projects.one(projectId).customPUT(Object.filterByKeys(fields, ['name', 'description', 'thumbnail', 'tags', 'displayName', 'domain']))
            .then(
                data => {
                    return this._ProjectDomains.remove({domain: deletingDomain}).then(Analyser.resolve, Analyser.reject);
                },
                Analyser.reject
            );
        return Analyser.promise;
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

    getPublishedHistory(projectId = null) {
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

    remove(project = {}, fields = {}) {
        let Analyser = new this._Analyser();
        this._Projects.one(project._id).remove(fields).then(
            data => {
                if (project.domain) {
                    return this._ProjectDomains.remove({domain: project.domain}).then(Analyser.resolve, Analyser.reject);
                }
                return Analyser.resolve(data);
            }, Analyser.reject);
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

    cleanInputFiles(inputName) {
        angular.element(inputName).val(null);
    }
}

export default Project;