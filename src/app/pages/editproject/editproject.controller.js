class EditProjectCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.Project = Project;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;
        this.getProject();

        this.tinymceOptions = {
            menubar:false,
            statusbar: false,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist',
            inline: false,
            plugins : 'advlist autolink link image lists charmap print preview',
            theme : "modern"
        };
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

    changeThumbnail(e) {
        if (window.FileReader && window.Blob) {

            var file = e.target.files[0];

            if (file) {
                this.isValidImage(file).then((result) => {
                    var reader = new FileReader();
                    reader.onloadend = (e) => {
                        this.project.thumbnail = reader.result;
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
                    case "89504e47"://"image/png"
                    //case "47494638"://"image/gif"
                    case "ffd8ffe0"://"image/jpeg"
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                        // valid
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
}

export default EditProjectCtrl;
