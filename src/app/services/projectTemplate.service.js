class ProjectTemplate {
    constructor (JWT, AppConstants, Restangular, Validator, $state, $q) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;

        this._Projects = Restangular.all('project-template');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
    }

    getList (fields = {}) {
        let deferred = this._$q.defer();
        this._Projects.one('').get(fields).then((result) => {
            this._Validator.validateHTTP(result);
            if (this._Validator.isValidHTTP()) {
                let response = this._Validator.getDataHTTP();

                deferred.resolve(response);
            } else {
                deferred.reject(this._Validator.getErrorsHTTP());
            }
        }, (result) => {
            this._Validator.validateHTTP(result.data);

            deferred.reject(this._Validator.getErrorsHTTP());
        });

        return deferred.promise;
    }
}

export default ProjectTemplate;