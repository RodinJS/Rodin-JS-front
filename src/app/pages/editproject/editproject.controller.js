class EditProjectCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, EventBus, ProjectStore) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.Project = Project;
        this.PUBLIC = AppConstants.PUBLIC;
        this.EDITOR = AppConstants.EDITOR;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;
        this.user = User.current;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;

        this.tinymceOptions = {
            menubar: false,
            statusbar: false,
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist',
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview',
            theme: "modern"
        };

        this.modals = {
            remove: false,
            share: false
        };

        this.eventBus = EventBus;
        ProjectStore.subscribeAndInit($scope, ()=> {
            this.project = ProjectStore.getProject();
            if(!this.project)
                this.getProject();
            else
                this.finaliseRequest();
        });
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId).then(
            project => {
                this.eventBus.emit(this.eventBus.project.SET, project);
                this.finaliseRequest();
            },
            err => {
                this.$state.go('landing.error');
            }
        )
    }

    finaliseRequest() {
        this.project.editorUrl = this.EDITOR + this.project.root;
        this.projectPublic = this.project.public === 'true';
        this.showLoader = false;
    }

    toggleStatus() {
        this.project.public = this.projectPublic.toString();

        this.showLoader = true;
        this.Project.toggleStatus(this.project._id, this.project.public).then(
            res => {
                this.eventBus.emit(this.eventBus.project.SET, this.project);
                this.showLoader = false;
            },
            err => {
                this.projectPublic = !this.projectPublic;
                this.project.public = this.projectPublic.toString();
                this.showLoader = false;
            }
        )
    }

    deleteProject() {
        this.showLoader = true;

        this.Project.remove(this.project._id).then(
            data => {
                this.showLoader = false;
                this.$state.go('app.dashboard');
            },
            err => {
                this.showLoader = false;
            }
        );
    }

    update() {
        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        projectInfo.tags = projectInfo.tags.map(i => i.text);
        this.showLoader = true;
        this.Project.update(this.project._id, projectInfo).then(
            data => {
                this.eventBus.emit(this.eventBus.project.SET, this.project);
                this.showLoader = false;
            },
            err => {
                this.showLoader = false;
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

    open(modal) {
        this.modals[modal] = true;
    }

    copyUrl() {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($("#projectUrl").val()).select();
        document.execCommand("copy");
        document.getElementById('projectUrl').style['transition'] = 'all .5s ease';
        document.getElementById('projectUrl').style['box-shadow'] = '0 0 5px 5px #222';
        $temp.remove();
        const t = setTimeout(() => {
            document.getElementById('projectUrl').style['box-shadow'] = 'none';
            clearTimeout(t);
        }, 1000);
    }
}

export default EditProjectCtrl;
