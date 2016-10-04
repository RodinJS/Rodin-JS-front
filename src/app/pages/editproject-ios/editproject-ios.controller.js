class EditProjectIosCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, JWT) {
        'ngInject';

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
        this.getProject();

        this.user = User.current;

        this.fileChoosen = {
            profile: false,
            p12: false
        };

        this.files = {
            profile: {
                name: ""
            },
            cert: {
                name: ""
            },
            icon: {
                name: "",
                src: ""
            }
        };

        this.submiting = false;
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.showLoader = false;
                this.project = project;
            },
            err => {
                this.$state.go('landing.error');
            }
        )
    }

    update() {
        this.showLoader = true;
        this.Project.update(this.project._id, this.project).then(
            data => {
                this.showLoader = false;
                console.log(data);
            },
            err => {
                this.showLoader = false;
                console.log(err);
            }
        )
    }

    changeIcon(e) {
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
                    alert('Unsupported image type');
                });
            }

        } else {
            alert("It seems your browser doesn't support FileReader.");
        }
    }

    isValidImage(file) {
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

    changeCert(e) {
        if (window.FileReader && window.Blob) {
            var file = e.target.files[0];
            this.files.cert.name = file.name;
            this._$scope.$apply();

        } else {
            alert("It seems your browser doesn't support FileReader.");
        }
    }

    changeProfile(e) {
        if (window.FileReader && window.Blob) {
            var file = e.target.files[0];
            this.files.profile.name = file.name;
            this._$scope.$apply();

        } else {
            alert("It seems your browser doesn't support FileReader.");
        }
    }

    build(e) {
        e.preventDefault();
        let project = {
            userId: this.user.username,
            appId: this.project._id,
            url: "http://google.com",
            appName: this.project.ios.name,
            ios: {
                exportMethod: "ad-hoc",
                bundleIdentifier: this.project.ios.bundle,
                developerId: this.project.ios.developerId,
                certPassword: this.project.ios.certPassword
            }
        };

        $("#configs").ajaxForm({
            dataType:"json",
            url: this._AppConstants.API + '/project/' + this.project._id + '/build/ios',
            headers: {
                "x-access-token": this._JWT.get()
            },
            data:{
                project: angular.toJson(project)
            },
            success: function (data) {
                console.log("success", data);
            },
            error: function (data) {
                console.log("success", data);
            }
        }).submit();

        console.log(project);
    };
}

export default EditProjectIosCtrl;
