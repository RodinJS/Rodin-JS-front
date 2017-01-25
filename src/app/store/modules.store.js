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
        let findModuleIndex = _.findIndex(factory.data.modules, (module) => module._id == data._id);
        if (findModuleIndex.length > 0) {
            factory.data.modules[findModuleIndex] = data;
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

    factory.getMyModules = function () {
        return factory.data.myModules;
    };

    return factory;
}

export default ModulesStore;
