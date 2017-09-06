class ProfileCtrl {
    constructor(AppConstants, User, $scope, Validator, Error, $stateParams, $state, $window, Notification, $uibModal) {
        'ngInject';
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this._Constants = AppConstants;
        this._$window = $window;
        this._$state = $state;
        this.currentUser = User.current;
        this._Validator = Validator;
        this._User = User;
        this._$scope = $scope;
        this.formData = {};
        this.privacy = false;
        this.showLoader = false;
        this.syncModal = false;
        this._$uibModal = $uibModal;
        //password: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{8,}$/,
        this.patterns = {
            password: /^(?=.*[A-Za-z])(?=.*\d)[^]{8,}$/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };

        this.newPassword = {
            password: "",
            confirm: ""
        };

        this.modals = {
            sync: false,
            unsync: false
        };

        this.autocompleteOptions = {
            types: '(cities)'
        };


        try {
            FB.init({
                appId: AppConstants.FB,
                cookie: true,  // enable cookies to allow the server to access
                               // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });
            FB.getLoginStatus((response) => {
                if (response.status == 'connected')
                    this.fbConnected = true;
                else
                    this.fbConnected = false;

            });
        }
        catch (e) {
            this.Notification.warning({message:`Tracking protection is turned on in private mode. Please turn off or use browser normal mode.`, delay: 7000})
        }

        try {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: AppConstants.GOOGLE,
                    scope: 'profile'
                });
            });
        }
        catch (e) {
            this.Notification.warning({message:`Tracking protection is turned on in private mode. Please turn off or use browser normal mode.`, delay: 7000})
        }
        if ($stateParams.token && $stateParams.id && this.currentUser) {

            let data = {
                id: $stateParams.id,
                token: $stateParams.token,
                socialEmail: $stateParams.socialEmail,
                email: this.currentUser.email,
                sync: true
            };

            this._User.gitAuth(data).then((res) => {
                this.currentUser.github = $stateParams.socialEmail;
                if(this.currentUser.projects.total > 0)
                    this.showGitSyncModal();
            }, (err) => {
                this.isSubmitting = false;
                this.errors = err;
            })

        }

        console.log(this.currentUser);

    }

    showGitSyncModal() {
        this.modalText = `Do you want to sync your existing projects with GitHub?`;
        this.delete = false;
        this.modalInstance = this._$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'layout/modals/githubSync.html',
            //controller: EditProjectWebCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: this._$scope,
            resolve: {},
        });

    }

    closeModal() {
        this.modalInstance.close();
        this._$state.go('app.profile', {token: undefined, id: undefined, socialEmail: undefined});
    }

    syncGithub(fromModal) {
        this._User.gitSync()
            .then(data => {
                this.Notification.success(data);
                this.showLoader = false;
                if (fromModal) {
                    this.modalInstance.close();
                    this._$state.go('app.profile', {token: undefined, id: undefined, socialEmail: undefined});
                }
            })
            .catch(err => {
                this.showLoader = false;
                this.modalInstance.close();
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            })
    }

    updateProfile(isValid) {
        if(!isValid) return;
        this.showLoader = true;
        let currentUser = {
            email: this.currentUser.email,
            profile: this.currentUser.profile,
            username: this.currentUser.username,
            notification:this.currentUser.notification
        };


        this._User.update(null, currentUser).then(
            data => {
                this.Notification.success('Profile Updated');
                this.showLoader = false;
            },
            err => {
                this.showLoader = false;
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            }
        );
    }

    fbSync() {
        this._User.fbAuth(true, this.fbConnected).then((res) => {
            this.currentUser.facebook = res.facebook;
            this.Notification.success('Facebook synced');
        }, (err) => {
            this.isSubmitting = false;
            this.errors = err;
            _.each(err, (val, key) => {
                this.Notification.error(val.fieldName);
            });
        })
    }

    gitSync() {
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
                socialEmail: BasicProfile.getEmail(),
                email: this.currentUser.email,
                sync: true

            };
            this._User.googleAuth(requestData).then((res) => {
                this.currentUser.google = res.google;
                this.Notification.success('Google synced');
            }, (err) => {
                this.isSubmitting = false;
                this.errors = err;
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            })

        });
    }

    openSyncModal(type) {
        this.modals.sync = true;
        this.syncType = type;

    }

    openUnSync(type) {
        this.modals.unsync = true;
        this.unSyncType = type;
    }

    syncOculusSteam() {
        let requestData = {
            email: this.currentUser.email,
            id: this.oculusSteamId
        };
        this._User.oculusSteamSync(requestData, this.syncType)
            .then(user => {
                this.Notification.success(`${this.syncType} synced`);
                this.currentUser[this.syncType] = true;
                delete this.syncType;
                this.modals.sync = false;
            }, (err) => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            })
    }

    confirmUnsync() {
        let fields = {
            username: this.currentUser.username,
            socialName: this.unSyncType
        };
        this._User.unSync(null, fields).then(
            data => {
                this.Notification.success(`${this.unSyncType} unsynced`);
                this.currentUser[this.unSyncType] = false;
                delete this.unSyncType;
                this.modals.unsync = false;
            },
            err => {
                _.each(err, (val, key) => {
                    this.Notification.error(val.fieldName);
                });
            }
        );
    }

    updatePassword(isValidForm = true) {
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
                this.Notification.success('Password successfully updated');
            }, (data) => {
                this.showLoader = false;
                this.passwordChangeResponse = 'error';
                this.Notification.error(`Can't update password`);

            });
        } else {
            console.log(Validator.getErrors());
        }
    }

    confirmPassword() {
        this._$scope.changePasswordForm.confirmPassword.$setValidity('match', this.newPassword.password == this.newPassword.confirm);
    }
}

export default ProfileCtrl;
