/**
 * Created by xgharibyan on 11/1/16.
 */

function ModulesStore(EventBus, BaseStore) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Modules';

    EventBus.on(EventBus.modules.SET, (scope, data) => {
        if (factory.data.modules)
          factory.data.modules = _.uniqBy(_.concat(factory.data.modules, data), '_id');
        else
          factory.data.modules = data;

        factory.emitChanges();
    });

    EventBus.on(EventBus.modules.UPDATE, (scope, data) => {
        let findModuleIndex = _.findIndex(factory.data.myModules, (module) => (module._id == data._id || module._id == data.moduleId));
        if (findModuleIndex > -1) {
            factory.data.myModules[findModuleIndex] = data;
        }

        factory.emitChanges();
    });

    EventBus.on(EventBus.modules.MYMODULESSET, (scope, data) => {
        if (factory.data.myModules)
          factory.data.myModules = _.uniqBy(_.concat(factory.data.myModules, data), '_id');
        else
          factory.data.myModules = data;

        factory.emitChanges();
    });

    factory.getModules = function () {
        return factory.data.modules;
    };

    factory.getMyModulesByPrjectId = function (module, projectId) {
        return _.find(module.projects, (project) =>  project.projectId == projectId);
    };

    factory.getMyModules = function (projectId) {
        if (!projectId) return factory.data.myModules;
        //const modules = _.filter(factory.data.myModules, (module) => (new Date() < new Date(module.expiredAt)));

        return _.map(factory.data.myModules, (module)=> {
            const assignedToProject = factory.getMyModulesByPrjectId(module, projectId);
            const validDate = (new Date() < new Date(module.expiredAt));
            console.log(validDate, assignedToProject, module.expiredAt);
            if (assignedToProject && validDate) {
                module.script = assignedToProject.script;
            } else{
                delete module.script;
            }

            return module;
        });
    };

    factory.handleMyModules = function () {

        return _.map(factory.data.modules, (module, key) => {
            const findMyModule = _.find(factory.data.myModules, (myModule) => (module._id == myModule._id || module._id == myModule.moduleId));
            if (findMyModule) {
                module.subscribed = true;
                module.expiredAt = findMyModule.expiredAt;
                module.unsubscribed = findMyModule.unsubscribed;
            }

            return module;
        });

    };

    factory.removeAllModules = function(){
        factory.data.myModules = false;
        factory.data.modules = false
    }

    return factory;
}

export default ModulesStore;
