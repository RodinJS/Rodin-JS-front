class EditProjectCtrl {
    constructor(AppConstants, Project, $state, $stateParams, $q, $scope, User, EventBus, ProjectStore, $window, $timeout, Notification) {
        'ngInject';

        $window.scrollTo(0, 0);

        this.$timeout = $timeout;
        this.Notification = Notification;
        this.appName = AppConstants.appName;
        this.Project = Project;
        this.PUBLIC = AppConstants.PUBLIC;
        this.EDITOR = AppConstants.EDITOR;
        this.previewUrl = AppConstants.PREVIEW;
        this.$state = $state;
        this.$q = $q;
        this._$scope = $scope;
        this.user = User.current;
        this._AppConstants = AppConstants;

        this.projectId = $stateParams.projectId;
        this.project = {};
        this.showLoader = true;


        this.wysiwygOptions =  [
            []
        ];

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
                this.finalizeRequest();

        });
    }

    getProject() {
        this.showLoader = true;
        this.Project.get(this.projectId, {projectSize:true}).then(
            project => {
                this.eventBus.emit(this.eventBus.project.SET, project);
                this.finalizeRequest();
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.$state.go('landing.error');
            }
        )
    }

    finalizeRequest() {
        this.project.editorUrl = this.EDITOR + this.project.root;
        if(this.project.publishedPublic)
            this.project.publishedUrl = `${this._AppConstants.PUBLISH}/${this.user.username}/${this.project.name}`;
        if(this.project.description)
            this.project.description = $('<div/>').html(this.project.description).text();
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
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.projectPublic = !this.projectPublic;
                this.project.public = this.projectPublic.toString();
                this.showLoader = false;
            }
        )
    }

    deleteProject() {
        this.showLoader = true;

        this.Project.remove(this.project).then(
            data => {
                this.Notification.success('Project deleted');
                this.showLoader = false;
                if(this.user.projects.total > 0){
                    this.user.projects.total--;
                }
                this.$state.go('app.dashboard');
            },
            err => {
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
                this.showLoader = false;
            }
        );
    }

    update() {
        let projectInfo = {};
        angular.extend(projectInfo, this.project);
        projectInfo.tags = projectInfo.tags.map(i => i.text);
        this.showLoader = true;
        console.log(projectInfo);
        this.Project.update(this.project._id, projectInfo).then(
            data => {
                this.Notification.success('Project updated');
                this.eventBus.emit(this.eventBus.project.SET, data);
                this.showLoader = false;
            },
            err => {
                this.showLoader = false;
                _.each(err, (val, key)=>{
                    this.Notification.error(val.fieldName);
                });
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
                    this.Notification.error('Unsupported image type');
                });
            }

        } else {
            this.Notification.warning('It seems your browser doesn\'t support FileReader.');

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
            var tim = this.$timeout(function () {
                defer.reject(result);
                this.$timeout.cancel(tim);
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
