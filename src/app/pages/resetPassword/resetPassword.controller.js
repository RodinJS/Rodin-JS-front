class ResetPasswordCtrl {
    constructor(AppConstants, User, $stateParams, $state, Notification) {
        'ngInject';

        this.patterns = {
            password: /^(?=.*[A-Za-z])(?=.*\d)[^]{8,}$/,
        };

        this.appName = AppConstants.appName;
        this.User = User;
        this.$stateParams = $stateParams;
        this.loaded = false;
        this.formErrors = AppConstants.FORMERRORS.reset;
        this.Notification = Notification;

        if (this.User.current) {
            return $state.go('app.dashboard');
        }

        if ($stateParams.t) {
            this.User.validateChangePasswordToken($stateParams.t)
                .then(
                    response => {
                        this.loaded = true;
                        if(response.tokenUsed) {
                            return this.tokenUsed = true;
                        }
                        this.newPasswordMode = true;
                    },
                    err => {
                        this.loaded = true;
                        console.log(err);
                    })
        }
        else{
            this.loaded = true;
        }


    }

    submitForm(isValid) {
        if(!isValid) return;
        this.isSubmitting = true;
        this.resetError = false;
        this.User.resetPassword(this.formData).then(
            response => {
                this.successfulySend = true;
                this.isSubmitting = false;

            },
            err => {
                this.isSubmitting = false;
                this.successfulySend = false;
                this.resetError = err[0].message || "User doesn't exist";
                this.Notification.error(this.resetError);
            })
    }

    sumbitNewPassword() {
        this.formData.token = this.$stateParams.t;
        this.isSubmitting = true;
        this.User.changePassword(this.formData).then(
            response => {
                console.log(response);
            },
            err => {
                if (err[0].code === 316) {
                    this.errorMessage = 'Recovery token is expired';
                }
                else {
                    this.errorMessage = 'New password must be at least 8 characters long, contain a number and letter';
                }
                this.Notification.error(this.errorMessage);
                this.isSubmitting = false;
            })
    }

}

export default ResetPasswordCtrl;
