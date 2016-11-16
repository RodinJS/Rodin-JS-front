/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class User {
    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, $timeout) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;

        this._User = Restangular.all('user');
        this._Auth = Restangular.all('auth');
        this._$state = $state;
        this._$q = $q;
        this._$timeout = $timeout;
        this._Validator = new Validator();

        this.current = null;
        this._inProgress = false;

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.fbLogin = this.fbLogin.bind(this);
        this.fbMe = this.fbMe.bind(this);
        this.fbAuth = this.fbAuth.bind(this);

    }

    login(fields = {}) {
        this.deferred = this._$q.defer();
        this._Auth.all("login").post(fields).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    confirmUsername(fields = {}) {
        this.deferred = this._$q.defer();
        this._User.one("confirmUsername").customPOST(fields).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    fbLogin(cb) {
        FB.login((response) => this.fbMe(cb));
    }

    fbMe() {
        FB.api('/me', 'get', {fields: 'email, first_name, last_name'}, (response)=> {
            if (!response || response.error)
                return this.onLoginError(response);

            response.type = 'facebook';
            this._Auth.one("socialAuth").customPOST(response).then(this.onLoginSuccess, this.onError);
        })
    }

    fbAuth() {

        this.deferred = this._$q.defer();
        FB.getLoginStatus((response)=> {
            if (response.status == 'connected')
                return this.fbMe();
            else
                return this.fbLogin();

        });
        return this.deferred.promise;
    }


    googleAuth(data) {
        this.deferred = this._$q.defer();
        this._Auth.one("socialAuth").customPOST(data).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    signUp(fields = {}) {
        return this.create(fields).then((res)=> {
            this._JWT.save(res.token);
            this.current = res.user;
            return res;
        }, err=> {
            return err;
        })
    }

    update(userId = null, fields = {}) {
        this.deferred = this._$q.defer();

        this._User.one(fields.username).customPUT(fields).then(this.onSuccess, this.onError);

        return this.deferred.promise;
    }

    updatePassword(fields = {}) {
        this.deferred = this._$q.defer();

        this._User.one('password').customPUT(fields).then(this.onSuccess, this.onError);

        return this.deferred.promise;
    }

    create(fields = {}) {
        this.deferred = this._$q.defer();

        this._User.post(fields).then(this.onSuccess, this.onError);

        return this.deferred.promise;
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._$timeout(()=> {
            this._$state.go(this._$state.$current, null, {reload: true});
        }, 100);
    }

    verifyPermission() {
        let deferred = this._$q.defer();

        this.verifyAuth().then(
            result=> {
                console.log(_.isUndefined(this.current.usernameConfirmed), this.current.usernameConfirmed);
                if (!this.current) {
                    deferred.reject(false);
                }
                else if (!_.isUndefined(this.current.usernameConfirmed) && this.current.usernameConfirmed) {
                    deferred.resolve(true);
                }
                else {
                    this._$state.go('landing.userconfirm');
                    deferred.reject(false);
                }
            },
            err=> {
                deferred.reject(false);
            });

        return deferred.promise;
    }

    verifyAuth() {
        let deferred = this._$q.defer();
        // check for JWT token
        // console.log("verifyAuth", this._JWT.get())
        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);
        } else {
            this._User.one("me").get().then((res) => {
                this.current = res.data;
                deferred.resolve(true);
            }, (err) => {
                this._JWT.destroy();
                this._$timeout(()=> {
                    deferred.resolve(false);
                }, 100);
            });
        }
        return deferred.promise;
    }

    ensureAuthIs(bool = false) {
        let deferred = this._$q.defer();
        this.verifyAuth().then((authValid) => {
            if (authValid !== bool) {
                this._$state.go('landing.login');
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }

        });

        return deferred.promise;
    }

    onSuccess(result) {
        this._Validator.validateHTTP(result);
        if (this._Validator.isValidHTTP()) {
            let response = this._Validator.getDataHTTP();
            this.deferred.resolve(response);
        } else {
            this.deferred.reject(this._Validator.getErrorsHTTP());
        }
        delete this.deferred;
    }

    onError(result) {
        this._Validator.validateHTTP(result.data);
        this.deferred.reject(this._Validator.getErrorsHTTP());
        delete this.deferred;
    }

    onLoginSuccess(result) {
        this._Validator.validateHTTP(result);
        if (this._Validator.isValidHTTP()) {
            let response = this._Validator.getDataHTTP();
            /// set auth token
            this._JWT.destroy();
            this._JWT.save(response.token);
            this.current = response.user;
            this._$state.go('app.dashboard');
            this.deferred.resolve(response);
        }
        else {
            this.deferred.reject(this._Validator.getErrorsHTTP());
        }
        delete this.deferred;
    }

}

export default User;