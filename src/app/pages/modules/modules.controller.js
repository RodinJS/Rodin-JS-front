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
        this.modulesURL = AppConstants.MODULES;

        this.moduleId = $state.params.id;

        this.files = {
            modules : {
                name: '',
                src: ''
            }
        };
        this.formData = {};

        this.patterns = {
            url: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    }

    changeFile(){

    }

    submitForm(isValid) {
        if(isValid) {
            console.log(this.formData)
        }
        return
    }

    isValidFile(file) {
        return new Promise((resolve, reject) => {
        })
    }
}
export default ModulesCtrl;
