class User {
	constructor(JWT, AppConstants, Restangular, Validator, $state, $q) {
		'ngInject';
		console.log("JWT", JWT)
		this._JWT = JWT;
		this._AppConstants = AppConstants;

		this._User = Restangular.all('user');
		this._Auth = Restangular.all('auth');
		this._$state = $state;
		this._$q = $q;
		this._Validator = new Validator();

		this.current = null;
		this._inProgress = false;

	}

	login(fields) {
		let deferred = this._$q.defer();
		this._Auth.all("login").post(fields).then((result) => {
			this._Validator.validateHTTP(result);
			if (this._Validator.isValidHTTP()) {
				var response = this._Validator.getDataHTTP();
				/// set auth token
				setAuthToken(response.token);
				this._JWT.save(res.token);
				this.current = res.user;

				defer.resolve(response);
			} else {
				defer.reject(this._Validator.getErrorsHTTP());
			}
		}, (result) => {
			this._Validator.validateHTTP(result.data);

			defer.reject(this._Validator.getErrorsHTTP());
		});

		return deferred.promise;
	}

	signUp(fields) {
		return this.create(fields).then((res)=> {
			this._JWT.save(res.token);
			this.current = res.user;

			return res;
		})
	}

	update(fields) {
		return this._User.put(fields).then(
			(res) => {
				this.current = res.user;
				return res.user;
			});
	}

	create(fields) {
		return this._User.post(fields).then(
			(res) => {
				return res;
			});
	}

	logout() {
		this.current = null;
		this._JWT.destroy();
		this._$state.go(this._$state.$current, null, {reload: true});
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
		} else if (!this._inProgress) {
			this._inProgress = true;
			this._User.one("").get()
				.then(
					(res) => {
						this.current = res.data.user;
						deferred.resolve(true);
					},
					(err) => {
						this._JWT.destroy();
						deferred.resolve(false);
					},
					()=> {
						this._inProgress = false;
						console.log("finally")
					});
		}
		return deferred.promise;
	}


	ensureAuthIs(bool) {
		let deferred = this._$q.defer();
		this.verifyAuth().then((authValid) => {
			if (authValid !== bool) {
				this._$state.go('app.login');
				deferred.resolve(false);
			} else {
				deferred.resolve(true);
			}

		});

		return deferred.promise;
	}

}

export default User;