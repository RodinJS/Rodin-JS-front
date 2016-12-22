class AuthCtrl {
    constructor(User, $state, AppConstants, $window, Notification) {
        'ngInject';
        this._Constants = AppConstants;
        this._User = User;
        this._$state = $state;
        this._$window = $window;
        this.Notification = Notification;
        this.title = $state.current.title;
        this.authType = $state.current.name.replace('landing.', '');

        this.patterns = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

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

    }

    submitForm() {
        this.isSubmitting = true;

        if (this.authType === "login") {
            this._User.login(this.formData).then(
                (res) => {
                    this._$state.go('app.dashboard');
                },
                (err) => {
                    this.isSubmitting = false;
                    this.errors = err;
                })
        }
        else if (this.authType === "register") {
            this._User.signUp(this.formData).then(
                res=>{

                    this.isSubmitting = false;
                    if(res[0]){
                        _.each(res, (val, key) => {
                            this.Notification.error(val.fieldName);
                        });
                        return;
                    }
                    this._$state.go('app.dashboard');
                },
                err=>{
                    this.isSubmitting = false;
                    console.log(err);
                }
            );
        }
        else if (this.authType === "forgot") {
            console.log("forgot");
        }
        else {
            this.isSubmitting = false;
        }
    }

    fbLogin() {
        this._User.fbAuth().then((res) => {
            this._$state.go('app.dashboard');
        }, (err) => {
            this.isSubmitting = false;
            this.errors = err;
        })
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
                type: 'google'
            };
            this._User.googleAuth(requestData);
        });
    }

    gitLogin() {
        this._$window.location.href = `https://github.com/login/oauth/authorize?client_id=${this._Constants.GITHUB}&redirect_uri=${this._Constants.API}/git&scope=user%20repo`;

    }
}

export default AuthCtrl;
