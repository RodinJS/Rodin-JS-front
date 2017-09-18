class EditProjectModulesCtrl {
    constructor($scope, $stateParams, AppConstants, ModulesService, ModulesStore, ProjectStore, EventBus, Notification, User, Project, $uibModal) {
        'ngInject';


        if (!$stateParams.projectId) return $state.go('landing.error');

        this._AppConstants = AppConstants;
        this._ModulesService = ModulesService;
        this._ModulesStore = ModulesStore;
        this._Notification = Notification;
        this._ProjectStore = ProjectStore;
        this._Project = Project;
        this._User = User;
        this._EventBus = EventBus;
        this._$scope = $scope;
        this._$stateParams = $stateParams;
        this._$uibModal = $uibModal;
        this.projectId = $stateParams.projectId;
        this.onError = this.onError.bind(this);
        this.getProject = this.getProject.bind(this);
        this._ModulesStore.removeAllModules();
        this._ModulesStore.subscribeAndInit($scope, () => {
            this.modulesList =  _.chunk(this._ModulesStore.getMyModules($stateParams.projectId), 4);

        });

        this._ProjectStore.subscribeAndInit($scope, () => {
            this.project = this._ProjectStore.getProject();
            if (!this.project)
                this.getProject();
        });

        return this.getMyModules();

    }

    getProject() {
        this.showLoader = true;
        this._Project.get(this.projectId).then(
            project => {
                this.showLoader = false;
                this._EventBus.emit(this._EventBus.project.SET, project);
            },

            err => {
                _.each(err, (val, key) => {
                    this._Notification.error(val.fieldName);
                });
                this.$state.go('landing.error');
            }
        );
    }

    getMyModules() {
        this._ModulesService.getMyModules({ projectId: this._$stateParams.projectId })
            .then(modules => this._EventBus.emit(this._EventBus.modules.MYMODULESSET, modules))
            .catch(err => this.onError(err));
    }

    moduleAssign(module) {
        if (!this._User.current) {
            return this.onError([{ fieldName: 'You should logged in to purchase module' }]);
        }

        this.module = angular.copy(module);
        let assignedToProject = this._ModulesStore.getMyModulesByPrjectId(module, this._$stateParams.projectId);
        if (assignedToProject) {
            this.module.script = assignedToProject.script;
        }

        this.assign(this.module);
        // this.modalInstance = this._$uibModal.open({
        //     animation: this.animationsEnabled,
        //     ariaLabelledBy: 'modal-title',
        //     ariaDescribedBy: 'modal-body',
        //     templateUrl: 'pages/editproject-modules/assignModal.html',
        //     controller: EditProjectModulesCtrl,
        //     controllerAs: 'vm',
        //     bindToController: true,
        //     scope: this._$scope,
        //     resolve: {},
        // });
    }

    assign(module) {
        const data = {
            moduleId: module._id,
            projectId: this._$stateParams.projectId,
            allowedHosts: _.map(this.allowedHosts, (host) => host.text),
        };

        this._ModulesService.assign(data)
            .then(assignedModule => {
                this.module.script = assignedModule;
                if(!this.module.projects)
                    this.module.projects = [];

                this.module.projects.push({
                    projectId: this._$stateParams.projectId,
                    allowedHosts: _.map(this.allowedHosts, (host) => host.text),
                    script: assignedModule,
                });
                this._EventBus.emit(this._EventBus.modules.UPDATE, this.module);
                let assignedToProject = this._ModulesStore.getMyModulesByPrjectId(this.module, this._$stateParams.projectId);
                if (assignedToProject) {
                    this.module.script = assignedToProject.script;
                    this.allowedHosts = assignedToProject.allowedHosts;
                };

                this._Notification.success('Module assigned');
            })
            .catch(err => this.onError(err));
    }

    copyToClipBoard(event) {

        const target = angular.element('#scriptInput');
        target.attr('type', 'text');
        target.focus();
        target[0].setSelectionRange(0, target.val().length);

        // copy the selection
        let succeed;
        try {
            succeed = document.execCommand('copy');
        } catch (e) {
            succeed = false;
        }

        // hide input again
        if (succeed)
            this._Notification.success('Copied');
        return succeed;
    }

    onError(err) {
        _.each(err, (val) => {
            this._Notification.error(val.fieldName);
        });
    }
}

export default EditProjectModulesCtrl;
