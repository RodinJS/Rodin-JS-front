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
    constructor($scope, $http, $state, AppConstants, Notification) {
        'ngInject';
        this.Notification = Notification;
        this.modulesURL = AppConstants.MODULES;

        this.$http = $http;
        this.moduleId = $state.params.id;
        this.file = {
            name: '',
            value: ''
        };
        this.formData = {};
        this.patterns = {
            url: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };
        // this.getModuleParams();
    }

    getModuleParams() {
        this.$http('url').then(res => {
            this.formData = res.data;
            this.file.name = res.data.file.name;
        });
    }

    changeFile(e) {
        let file = e.target.files[0];
        if (file) {
            this.isValidFile(file).then(() => {
                this.file.value = e.target.files[0];
                this.file.name = file.name;
            }, (result) => {
                angular.element('#js-file')[0].value = '';
                this.Notification.error(result.message);
            });
        }
    }

    submitForm(form, isValid) {
        if (isValid) {
            let formData = new FormData(form);
            formData.append('file', this.file.value);
            formData.append('moduleId', this.moduleId);
            this.request(formData)
                .then(res => {
                    let response = JSON.parse(res);
                    this.Notification.success(response.data);
                }, err => {
                    let response = JSON.parse(err);
                    if (!response.success) {
                        this.Notification.error(response.error.message);
                    }
                });
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
                return resolve(result);
            }
        })
    }

    request(data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        return resolve(xhr.response);
                    } else {
                        return reject(xhr.response);
                    }
                }
            });
            xhr.open("POST", this.modulesURL + "submit");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        })
    }
}
export default ModulesCtrl;
