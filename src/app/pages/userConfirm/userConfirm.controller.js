class UserConfirmCtrl {
    constructor(AppConstants, User, $state) {
        'ngInject';

        if(!User.current || User.current.usernameConfirmed || _.isUndefined(User.current.usernameConfirmed)){
            return $state.go('app.dashboard');
        }

        this.appName = AppConstants.appName;
        this.User = User;
        this.title = $state.current.title;
        this._$state = $state;
        this.formData = {
            username: User.current.username
        }

    }

    submitForm() {
        this.User.confirmUsername(this.formData).then(
            response=> {
                this._$state.go('app.dashboard');
            },
            err=> {
                console.log(err);
            })
    }

}

export default UserConfirmCtrl;
