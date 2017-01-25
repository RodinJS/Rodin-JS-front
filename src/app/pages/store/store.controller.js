class StoreCtrl {
    constructor($scope, AppConstants, ModulesService, ModulesStore, ProjectStore, EventBus, Notification, User, $uibModal) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._ModulesService = ModulesService;
        this._ModulesStore = ModulesStore;
        this._ProjectStore = ProjectStore;
        this._Notification = Notification;
        this._User = User;
        this._EventBus = EventBus;
        this._$scope = $scope;
        this._$uibModal = $uibModal;
        this.onError = this.onError.bind(this);
        this.moduleSubscribe = this.moduleSubscribe.bind(this);
        this._ModulesStore.subscribeAndInit($scope, () => {
            this.modulesList = this._ModulesStore.getModules();
            if (!this.modulesList)
              return this.getModulesList();
        });
    }

    getModulesList() {
        this._ModulesService.getList()
          .then(modules => this._EventBus.emit(this._EventBus.modules.SET, modules))
          .catch(err => this.onError(err));
    }

    moduleSubscribe(module) {
        if (!this._User.current) {
            return this.onError([{ fieldName: 'You should logged in to purchase module' }]);
        }

        this.module = module;
        this.modalInstance = this._$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'pages/store/subscribeModal.html',
            controller: StoreCtrl,
            controllerAs: 'vm',
            bindToController: true,
            scope: this._$scope,
            resolve: {},
        });
    }

    purchaseModule(module) {
        this._ModulesService.subscribe({ moduleId: module._id })
            .then(subscribedModule =>  {
                this._Notification.success('Module purchased');
                console.log(subscribedModule);
            })
            .catch(err => this.onError(err));
    }

    onError(err) {
        _.each(err, (val)=> {
            this._Notification.error(val.fieldName);
        });
    }
}
export default StoreCtrl;
