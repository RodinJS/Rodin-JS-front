/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class Project {

	constructor(JWT, AppConstants, Restangular, Validator, $state, $q) {
		'ngInject';
		this._JWT = JWT;
		this._AppConstants = AppConstants;

		this._Projects = Restangular.all('project');
		this._$state = $state;
		this._$q = $q;
		this._Validator = new Validator();
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
	}

	get(projectId = null, fields) {
		//if(this.deferred) return;
		this.deferred = this._$q.defer();
		this._Projects.one(projectId).get(fields).then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	getList(fields = {}) {
		this.deferred = this._$q.defer();
		this._Projects.one('').get(fields).then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	unPublish(projectId = null) {
		this.deferred = this._$q.defer();
		this._Projects.one('publish/'+projectId).remove().then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	publish(projectId = null) {
		this.deferred = this._$q.defer();
		this._Projects.one('publish/'+projectId).get().then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	transpile(projectId = null){
		this.deferred = this._$q.defer();
		this._Projects.one(projectId+'/build/transpile').get().then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	update(projectId = null, fields = {}) {
		this.deferred = this._$q.defer();
		this._Projects.one(projectId).customPUT(Object.filterByKeys(fields, ['name', 'description', 'thumbnail', 'tags']))
			.then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	create(fields = {}) {
		this.deferred = this._$q.defer();
		this._Projects.post(fields).then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	remove(projectId = null, fields = {}) {
		this.deferred = this._$q.defer();
		this._Projects.one(projectId).remove(fields).then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	toggleStatus(projectId = null, status = 'false') {
		this.deferred = this._$q.defer();
		this._Projects.one('pp').one(projectId).customPOST({status: status}).then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	download(projectId = "", target = "") {
		this.deferred = this._$q.defer();
		this._Projects.one(projectId).one('download').one(target).customGET().then(this.onSuccess, this.onError);
		return this.deferred.promise;
	}

	onSuccess(result){
		this._Validator.validateHTTP(result);
		if (this._Validator.isValidHTTP()) {
			let response = this._Validator.getDataHTTP();
			if(this.deferred)
				this.deferred.resolve(response);
		}
		else {
			if(this.deferred)
				this.deferred.reject(this._Validator.getErrorsHTTP());
		}
		delete this.deferred;
	}

	onError(result){
		this._Validator.validateHTTP(result.data);
		if(this.deferred)
			this.deferred.reject(this._Validator.getErrorsHTTP());
		delete this.deferred;
	}
}

export default Project;