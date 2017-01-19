class StoreCtrl {
    constructor($scope, AppConstants, ModulesService, ModulesStore, EventBus, Notification) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._ModulesService = ModulesService;
        this._ModulesStore  = ModulesStore;
        this._EventBus = EventBus;
        this._$scope = $scope;


        this._ModulesStore.subscribeAndInit($scope, ()=> {
            this.modulesList = this._ModulesStore.getModules();
            if(!this.modulesList)
                return this.getModulesList();

            this.containerClass = this.modulesList.length > 6 ? `col-md-2` : `col-md-${12/this.modulesList.length}`;

        });
    }

    getModulesList(){
        this._ModulesService.getList()
            .then(modules=>{
               return this._EventBus.emit(this._EventBus.modules.SET, modules);
            })
            .catch(err=>{

            })
    }
}
export default StoreCtrl;
