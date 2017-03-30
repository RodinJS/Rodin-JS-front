class ResetPasswordCtrl {
    constructor(AppConstants, User, $stateParams, $state) {
        'ngInject';

	    this.patterns = {
		    password: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{8,}$/
	    };

        this.appName = AppConstants.appName;
        this.User = User;
        this.$stateParams = $stateParams;

        if(this.User.current){
            return $state.go('app.dashboard');
        }

        if($stateParams.t){
            this.newPasswordMode = true;
        }


    }

    submitForm() {
        this.isSubmitting = true;
        this.resetError = false;
        this.User.resetPassword(this.formData).then(
            response=> {
                this.successfulySend = true;
                this.isSubmitting = false;

            },
            err=> {
                this.isSubmitting = false;
                this.resetError = err[0].message || 'User not exist';
            })
    }

    sumbitNewPassword(){
        this.formData.token = this.$stateParams.t;
        this.isSubmitting = true;
        this.User.changePassword(this.formData).then(
            response=> {
                console.log(response);
            },
            err=> {
                if(err[0].code === 316){
                    this.errorMessage = 'Wrong token';
                }
                else{
                    this.errorMessage = 'New password must be at least 8 characters long, contain a number and letter';
                }
                this.isSubmitting = false;
            })
    }

}

export default ResetPasswordCtrl;
