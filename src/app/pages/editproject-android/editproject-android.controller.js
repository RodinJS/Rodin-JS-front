class EditProjectAndroidCtrl {
    constructor (AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT, EventBus, ProjectStore, Validator, Notification) {
        'ngInject';

        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this._AppConstants = AppConstants;
        this._JWT = JWT;
        this.Project = Project;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;

        this.user = User.current;
        this._checkVersion = Validator.checkVersion;

        this.fileChoosen = {
            profile: false,
            p12: false
        };

        this.files = {
            keystore: {
                name: ""
            },
            icon: {
                name: "",
                src: ""
            }
        };

        this.submiting = false;

        this.openEvent = null;
        this.modals = {
            password: false
        };

        this.keyStoreFileUpload = false;

        this.eventBus = EventBus;
        this.getProject();
        ProjectStore.subscribeAndInit($scope, ()=> {
            this.project = ProjectStore.getProject();
        });
    }

    getProject () {
        this.showLoader = true;
        this.Project.get(this.projectId, {device: 'android'}).then(
            project => {
                this.showLoader = false;
                this.eventBus.emit(this.eventBus.project.SET, project);
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.showLoader = false;
                //this.$state.go('landing.error');
            }
        )
    }

    update () {
        this.showLoader = true;
        this.Project.update(this.project._id, this.project).then(
            data => {
                this.showLoader = false;
                this.eventBus.emit(this.eventBus.project.SET, data);
            },
            err => {
                this.showLoader = false;
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
            }
        )
    }

    changeIcon (e) {
        if (window.FileReader && window.Blob) {

            var file = e.target.files[0];

            if (file) {
                this.isValidImage(file).then((result) => {
                    var reader = new FileReader();
                    reader.onloadend = (e) => {
                        this.files.icon.name = file.name;
                        this.files.icon.src = reader.result;
                        this._$scope.$apply();
                    };
                    reader.readAsDataURL(file);
                }, (result) => {
                    this.Notification.error('Unsupported image type');
                });
            }

        } else {
            this.Notification.warning('It seems your browser doesn\'t support FileReader.');
        }
    }

    isValidImage (file) {
        var defer = this.$q.defer();
        var result = {
            valid: true,
            message: ""
        };

        if (file.size > 1024 * 1024) {
            result.valid = false;
            result.message = "FIle size must be less than 1mb";
            var tim = $timeout(function () {
                defer.reject(result);
                $timeout.cancel(tim);
            });
        } else {
            var fileReader = new FileReader();
            fileReader.onloadend = function (e) {
                var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                var header = "";
                for (var i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                switch (header) {
                    case "89504e47":
                        break;
                    default:
                        result.valid = false;
                        result.message = "Allowed only .jpg .jpeg and .png file types.";
                        break;
                }

                if (result.valid) {
                    defer.resolve(result);
                } else {
                    defer.reject(result);
                }
            };
            fileReader.readAsArrayBuffer(file);
        }

        return defer.promise;
    }

    changeKeyStore (e) {
        if (window.FileReader && window.Blob) {
            var file = e.target.files[0];
            this.files.keystore.name = file.name;
            this._$scope.$apply();

        } else {
            this.Notification.warning('It seems your browser doesn\'t support FileReader.');
        }
    }

    build () {
        const e = this.openEvent;
        const ctrl = this;
        e.preventDefault();
        let project = {
            userId: this.user.username,
            appId: this.project._id,
            url: "http://google.com",
            appName: this.project.android.name,
            android: this.project.android,
            version:this.project.android.version,
        };

        this.showLoader = true;
        $("#configs").ajaxForm({
            dataType: "json",
            url: this._AppConstants.API + '/project/' + this.project._id + '/build/android',
            headers: {
                "x-access-token": this._JWT.get()
            },
            data: {
                project: angular.toJson(project)
            },
            success: function (data) {
                ctrl.modals.password = false;
                ctrl._$scope.configs.displayName.focused = false;
                ctrl._$scope.configs.version.focused = false;
                ctrl._$scope.configs.package.focused = false;
                ctrl._$scope.configs.KSFLName.focused = false;
                ctrl._$scope.configs.KSOrganization.focused = false;
                ctrl._$scope.configs.KSCity.focused = false;
                ctrl._$scope.configs.KSState.focused = false;
                ctrl._$scope.configs.KSCC.focused = false;
                ctrl._$scope.configs.KSAlias.focused = false;
                ctrl.getProject();
                ctrl._$scope.$apply();
                ctrl.Notification.success('Android build start');
            },
            error: function (data) {
                if(data.responseJSON && data.responseJson.error.message)
                    ctrl.Notification.error(data.responseJSON.error.message);
                ctrl.showLoader = false;
                ctrl._$scope.$apply();
            }
        }).submit();

        console.log(project);
    };

    cancelBuild (e) {
        const ctrl = this;
        e.preventDefault();
        let project = {
            userId: this.user.username,
            appId: this.project._id,

        };

        this.showLoader = true;
        $("#configs").ajaxForm({
            dataType: "json",
            type: 'DELETE',
            url: this._AppConstants.API + '/project/' + this.project._id + '/build/android',
            headers: {
                "x-access-token": this._JWT.get()
            },
            data: {
                project: angular.toJson(project)
            },
            success: function (data) {
                ctrl.getProject();
                ctrl.showLoader = false;
                ctrl._$scope.$apply();
            },
            error: function (data) {
                ctrl.showLoader = false;
                ctrl._$scope.$apply();
            }
        }).submit();

        console.log(project);
    };

    open (e) {
        this.modals.password = true;
        this.openEvent = e;
    }

    download () {
        this.showLoader = true;
        this.Project.download(this.project._id, 'android').then(
            data => {
                this.showLoader = false;
                window.location = data.downloadUrl;
            },
            err => {
                this.showLoader = false;
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
            }
        )
    }
}

export default EditProjectAndroidCtrl;
