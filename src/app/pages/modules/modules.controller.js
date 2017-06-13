/*
 var data = new FormData();
 data.append("moduleId", "593910f6d1c691ed8bb1d5c3");
 data.append("file", "mainCtrl.js");
 data.append("title", "Analytics kruto");
 data.append("description", "Some secription about analytics");
 data.append("exampleLink", "http://google.com");
 data.append("documentationLink", "http://yahoo.com");
 data.append("email", "gago@gago.com");
 var xhr = new XMLHttpRequest();
 xhr.withCredentials = true;
 xhr.addEventListener("readystatechange", function () {
 if (this.readyState === 4) {
 console.log(this.responseText);
 }
 });
 xhr.open("POST", "http://localhost:4000/modules/submit");
 xhr.setRequestHeader("cache-control", "no-cache");
 xhr.setRequestHeader("postman-token", "ec8ea987-0233-2691-bd1c-fbe2ed9765bc");
 xhr.send(data);
 */
class ModulesCtrl {
    constructor($scope, $state, $http, AppConstants, Notification) {
        'ngInject';
        this._$scope = $scope;
        this.$http = $http;
        this.Notification = Notification;
        this.modulesURL = AppConstants.MODULES;

        this.moduleId = $state.params.id;

        this.fileName = '';
        this.formData = {};

        this.patterns = {
            url: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    }

    changeFile(e) {
        if (window.FileReader && window.Blob) {
            var file = e.target.files[0];
            if (file) {
                this.isValidFile(file).then(() => {
                    this.file = e.target.files[0];
                    this.fileName = file.name;
                }, (result) => {
                    angular.element('#js-file')[0].value = '';
                    this.Notification.error(result.message);
                });
            }

        } else {
            this.Notification.warning('It seems your browser doesn\'t support FileReader.');
        }
    }

    submitForm(form, isValid) {
        if (isValid) {
            this.formData.moduleId = this.moduleId;
            let formData = new FormData(form);
            this.createSubmitData(formData);
            formData.append('file', this.file);
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });
            xhr.open("POST", this.modulesURL + "submit");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(formData);
        }
    }

    isValidFile(file) {
        return new Promise((resolve, reject) => {
            let result = {
                valid: true,
                message: '',
            };
            if (file.type !== "application/javascript") {
                result.valid = false;
                result.message = 'Unsupported file type';
                return reject(result);
            } else {
                result = {
                    valid: true,
                    message: '',
                };
                return resolve(result)
            }
        })
    }

    createSubmitData(data) {
        let keys = Object.keys(this.formData);
        keys.map(i => {
            data.append(i, this.formData[i]);
        });
        return data;
    }
}
export default ModulesCtrl;
