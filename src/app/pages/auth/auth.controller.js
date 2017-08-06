import footer from '../home/scripts/components/footer';
import header from '../home/scripts/components/header';

class AuthCtrl {
    constructor(User, $scope, $state, $stateParams, AppConstants, $window, Notification) {
        'ngInject';
        this._Constants = AppConstants;
        this._$state = $state;
        this._User = User;
        this._$state = $state;
        this._$stateParams = $stateParams;
        this._$window = $window;
        this.Notification = Notification;
        this.title = $state.current.title;
        this.authType = $state.current.name.replace('landing.', '');
        this.formErrors = AppConstants.FORMERRORS.register;
        //this.gotToHome = this.gotToHome.bind(this);

        this.patterns = {
            password: /^(?=.*[A-Za-z])(?=.*\d)[^]{8,}$/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };


        try {
            FB.init({
                appId: AppConstants.FB,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8', // use graph api version 2.8
            });
        }
        catch(e){
            this.Notification.warning({message:`Tracking protection is turned on in private mode. Please turn off or use browser normal mode.`, delay: 7000})
        }
        try{
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: AppConstants.GOOGLE,
                    scope: 'profile',
                });
            });
        }
        catch(e){
            this.Notification.warning({message:`Tracking protection is turned on in private mode. Please turn off or use browser normal mode.`, delay: 7000})
        }
        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(() => {
                footer.init();
                header.init();
            });
        });


    }

    submitForm(isValid) {
        this.isSubmitting = true;

        if (this.authType === 'login') {
            this._User.login(this.formData).then(
                (res) => {
                    this._$state.go('app.dashboard');
                },

                (err) => {
                    this.isSubmitting = false;
                    this.errors = err;
                    this.Notification.error('Wrong username or password');

                });
        } else if (this.authType === 'register' && isValid) {
            this._User.signUp(this.formData).then(
                res => {

                    this.isSubmitting = false;
                    if (res[0]) {
                        _.each(res, (val, key) => {
                            this.Notification.error(val.fieldName);
                        });
                        return;
                    }
                    this._User.getMe();
                    this._$state.go('app.dashboard');
                },

                err => {
                    this.isSubmitting = false;
                }
            );
        } else if (this.authType === 'forgot') {
        } else {
            this.isSubmitting = false;
        }
    }

    fbLogin() {
        this._User.fbAuth().then((res) => {
            this._$state.go('app.dashboard');
        }, (err) => {
            this.isSubmitting = false;
            this.errors = err;
        });
    }

    googleLogin() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(() => {
            const BasicProfile = auth2.currentUser.get().getBasicProfile();
            const requestData = {
                first_name: BasicProfile.getGivenName(),
                last_name: BasicProfile.getFamilyName(),
                id: BasicProfile.getId(),
                email: BasicProfile.getEmail(),
                type: 'google',
            };
            this._User.googleAuth(requestData);
        });
    }

    gitLogin() {
        this._$window.location.href = `https://github.com/login/oauth/authorize?client_id=${this._Constants.GITHUB}&redirect_uri=${this._Constants.API}/git&scope=user%20repo`;
    }
}

export default AuthCtrl;
