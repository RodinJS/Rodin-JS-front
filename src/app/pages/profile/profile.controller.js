class ProfileCtrl {
    constructor (AppConstants, User, $scope, Validator, Error, $stateParams, $state, $window, Notification) {
        'ngInject';
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this._Constants = AppConstants;
        this._$window = $window;
        this.currentUser = User.current;
        this._Validator = Validator;
        this._User = User;
        this._$scope = $scope;
        this.formData = {};

        this.showLoader = false;
        this.syncModal = false;
        this.patterns = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

        this.newPassword = {
            password: "",
            confirm: ""
        };

        this.passwordChangeResponse = '';

        FB.init({
            appId: AppConstants.FB,
            cookie: true,  // enable cookies to allow the server to access
                           // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
        });

        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: AppConstants.GOOGLE,
                scope: 'profile'
            });
        });

        if($stateParams.token && $stateParams.id && this.currentUser) {

            let data = {
                id:$stateParams.id,
                token:$stateParams.token,
                email:this.currentUser.email,
                sync:true
            };

            this._User.gitAuth(data).then((res) => {
                this.currentUser.github = true;
                $state.go('app.profile', {token:undefined, id:undefined});

            }, (err) => {
                this.isSubmitting = false;
                this.errors = err;
            })

        }

    }

    updateProfile () {
        this.showLoader = true;
        let currentUser = {
            email: this.currentUser.email,
            profile: this.currentUser.profile,
            username: this.currentUser.username
        };

        currentUser.profile.skills = currentUser.profile.skills.map(i => i.text);

        this._User.update(null, currentUser).then(
            data => {
                this.showLoader = false;
            },
            err => {
                this.showLoader = false;
            }
        );
    }

    fbSync() {
        this._User.fbAuth(true).then((res) => {
            this.currentUser.facebook = true;
            this.Notification.success('Facebook synced');
        }, (err) => {
            this.isSubmitting = false;
            this.errors = err;
            _.each(err, (val, key)=>{
                this.Notification.error(val.fieldName);
            });
        })
    }

    gitSync(){
        this._$window.location.href = `https://github.com/login/oauth/authorize?client_id=${this._Constants.GITHUB}&redirect_uri=${this._Constants.API}/git/sync&scope=user%20repo`;
    }

    googleSync() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(() => {
            const BasicProfile = auth2.currentUser.get().getBasicProfile();
            const requestData = {
                first_name: BasicProfile.getGivenName(),
                last_name: BasicProfile.getFamilyName(),
                id: BasicProfile.getId(),
                email: this.currentUser.email,
                sync: true

            };
            this._User.googleAuth(requestData).then((res) => {
                this.currentUser.google = true;
                this.Notification.success('Google synced');
            }, (err) => {
                this.isSubmitting = false;
                this.errors = err;
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
            })

        });
    }

    openSyncModal(type){
       this.syncModal = true;
       this.syncType = type;

    }

    syncOculusSteam(){
        let requestData = {
            email:this.currentUser.email,
            id:this.oculusSteamId
        };
        this._User.oculusSteamSync(requestData, this.syncType)
            .then(user=>{
                this.currentUser[this.syncType] = true;
                delete this.syncType;
                this.syncModal = false;
                this.Notification.success(`${this.syncType} synced`)
            }, (err)=>{
                console.log(err);
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
            })
    }


    updatePassword (isValidForm = true) {
        if (!isValidForm) {
            return;
        }

        const Validator = new this._Validator();

        Validator.validate([
            {
                name: "password",
                value: this.newPassword.password,
                conditions: {
                    required: true,
                }
            },
            {
                name: "confirm",
                value: this.newPassword.confirm,
                conditions: {
                    required: true
                }
            }
        ]);

        if (Validator.isValid()) {
            var data = Validator.getData();

            this.showLoader = true;
            this._User.updatePassword(Object.filterByKeys(data, ['password'])).then((data) => {
                this.showLoader = false;
                this.passwordChangeResponse = 'success';
            }, (data) => {
                this.showLoader = false;
                this.passwordChangeResponse = 'error';

            });
        } else {
            console.log(Validator.getErrors());
        }
    }

    confirmPassword () {
        this._$scope.changePasswordForm.confirmPassword.$setValidity('match', this.newPassword.password == this.newPassword.confirm);
    }
}

export default ProfileCtrl;
