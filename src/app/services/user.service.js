/**
 * Created by kh.levon98 on 20-Sep-16.
 */
class User {
    constructor(JWT, AppConstants, Restangular, Validator, $state, $q, $timeout, Analyser, NotificationsStore) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._NotificationsStore = NotificationsStore;
        this._User = Restangular.all('user');
        this._Auth = Restangular.all('auth');
        this._Git  = Restangular.all('git');
        this._Notifications = Restangular.all('notifications');
        this._$state = $state;
        this._$q = $q;
        this._$timeout = $timeout;
        this._Validator = new Validator();

        this.current = null;
        this._inProgress = false;
        this._Analyser = Analyser;

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSyncSuccess = this.onSyncSuccess.bind(this);
        this.fbLogin = this.fbLogin.bind(this);
        this.fbMe = this.fbMe.bind(this);
        this.fbAuth = this.fbAuth.bind(this);

    }

    login(fields = {}) {
        this.deferred = this._$q.defer();
        this._Auth.all('login').post(fields).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    subscribe(fields = {}) {
        let Analyser = new this._Analyser();

        this._User.one('subscribe').customPOST(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    confirmUsername(fields = {}) {
        this.deferred = this._$q.defer();
        this._User.one('confirmUsername').customPOST(fields).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    resetPassword(fields = {}) {
        let Analyser = new this._Analyser();
        this._User.one('resetPassword').customPOST(fields).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    changePassword(fields = {}) {
        this.deferred = this._$q.defer();
        this._User.one('resetPassword').customPUT(fields).then(this.onLoginSuccess, this.onError);
        return this.deferred.promise;
    }

    getMe() {
        let Analyser = new this._Analyser();
        this._User.one('me').get({ usedStorage: true, projectsCount: true }).then((res) => {
            this.current = res.data;
            Analyser.resolve(res);
        }, Analyser.reject);
        return Analyser.promise;
    }

    fbLogin(sync) {
        FB.login((response) => this.fbMe(sync), { scope: 'email' });
    }

    fbMe(sync) {
        FB.api('/me', 'get', { fields: 'email, first_name, last_name' }, (response)=> {

            let responseMethods = [this.onLoginSuccess, this.onError];
            if (!response || response.error)
                return this.onError(response);

            if (sync) {
                response.socialEmail = response.email;
                response.email = this.current.email;
                response.sync = true;
                responseMethods = [this.onSyncSuccess, this.onError];
            }

            return this._Auth.one('social/facebook').customPOST(response).then(responseMethods[0], responseMethods[1]);
        });
    }

    fbAuth(sync, fbConnected) {

        this.deferred = this._$q.defer();

        if (fbConnected)
            this.fbMe(sync);
        else
            this.fbLogin(sync);

        return this.deferred.promise;
    }

    googleAuth(data) {
        this.deferred = this._$q.defer();
        let responseMethods = data.sync ? [this.onSyncSuccess, this.onError] : [this.onLoginSuccess, this.onError];
        this._Auth.one('social/google').customPOST(data).then(responseMethods[0], responseMethods[1]);
        return this.deferred.promise;
    }

    gitAuth(data) {
        this.deferred = this._$q.defer();
        this._Auth.one('social/github').customPOST(data).then(this.onSyncSuccess, this.onError);
        return this.deferred.promise;
    }

    gitSync(data) {
        let Analyser = new this._Analyser();

        this._Git.one('syncProjects').customPOST({}).then(Analyser.resolve, Analyser.reject);
        return Analyser.promise;
    }

    oculusSteamSync(data, type) {
        this.deferred = this._$q.defer();
        this._Auth.one(`social/${type}`).customPOST(data).then(this.onSyncSuccess, this.onError);
        return this.deferred.promise;
    }

    signUp(fields = {}) {
        return this.create(fields).then((res)=> {
            this._JWT.save(res.token);
            this.current = res.user;
            return res;
        }, err=> {

            return err;
        });
    }

    update(userId = null, fields = {}) {
        let Analyser = new this._Analyser();

        this._User.one(fields.username).customPUT(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    unSync(userId = null, fields = {}) {
        let Analyser = new this._Analyser();

        this._User.one(`unsync/${fields.username}/${fields.socialName}`).get().then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    validateChangePasswordToken(token) {
        let Analyser = new this._Analyser();

        this._User.one(`resetPassword?token=${token}`).get().then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    updatePassword(fields = {}) {
        let Analyser = new this._Analyser();

        this._User.one('password').customPUT(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    create(fields = {}) {
        let Analyser = new this._Analyser();

        this._User.post(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._NotificationsStore.deleteAllNotifications();
        this._$timeout(()=> {
            this._$state.go(this._$state.$current, null, { reload: true });
        }, 100);
    }

    verifyPermission() {
        let deferred = this._$q.defer();
        this.verifyAuth().then(
            result=> {
                if (!this.current) {
                    deferred.reject(false);
                } else if (_.isUndefined(this.current.usernameConfirmed) || this.current.usernameConfirmed) {
                    deferred.resolve(true);
                } else {
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
        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);
        } else {
            this._User.one('me').get({ usedStorage: true, projectsCount: true }).then((res) => {
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

    getNotifications(fields = {}) {
        let Analyser = new this._Analyser();

        this._Notifications.one('/').get(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    deleteNotification(fields) {
        let Analyser = new this._Analyser();

        this._Notifications.one('/?' + fields).remove(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    updateNotification(fields = {}) {
        let Analyser = new this._Analyser();

        this._Notifications.one('/').put(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
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
        } else {
            this.deferred.reject(this._Validator.getErrorsHTTP());
        }

        delete this.deferred;
    }

    onSyncSuccess(result) {
        this._Validator.validateHTTP(result);

        if (this._Validator.isValidHTTP()) {
            let response = this._Validator.getDataHTTP();
            //console.log(response);
            //this.current = response;
            this.deferred.resolve(response);

        } else {
            this.deferred.reject(this._Validator.getErrorsHTTP());
        }

        delete this.deferred;
    }

}

export default User;
