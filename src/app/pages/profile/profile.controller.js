class ProfileCtrl {
    constructor(AppConstants, User, $scope, Validator, Error) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.currentUser = User.current;
        this._Validator = Validator;
        this._User = User;
        this._$scope = $scope;
        this.formData = {};

        this.showLoader = false;

        this.patterns = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

        this.newPassword = {
            password: "",
            confirm: ""
        };

        this.passwordChangeResponse = '';
    }

    updateProfile(isValidForm = true) {
        if (!isValidForm) {
            return;
        }

        const Validator = new this._Validator();

        Validator.validate([
            {
                name: "profile.firstName",
                value: this.currentUser.profile.firstName,
                conditions: {}
            },
            {
                name: "profile.lastName",
                value: this.currentUser.profile.lastName,
                conditions: {}
            },
            {
                name: 'email',
                value: this.currentUser.email,
                conditions: {
                    pattern: this.patterns.email,
                    required: true
                }
            },
            {
                name: 'username',
                value: this.currentUser.username,
                conditions: {}
            }
        ]);

        if (Validator.isValid()) {
            var data = Validator.getData();

            this.showLoader = true;
            this._User.update(null, data).then((data) => {
                this.showLoader = false;
                console.log("success");
            }, (data) => {
                this.showLoader = false;
                console.log("error");
            });
        } else {
            console.log(Validator.getErrors());
        }
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
            }, (data) => {
                this.showLoader = false;
                this.passwordChangeResponse = 'error';
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
