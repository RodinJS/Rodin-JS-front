/**
 * Created by xgharibyan on 11/1/16.
 */


function ModulesStore(EventBus, BaseStore) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Modules';

    EventBus.on(EventBus.modules.SET, function (scope, data) {

        if(factory.data.modules)
            factory.data.modules = _.uniqBy(_.concat(factory.data.modules, data), '_id');
        else
            factory.data.modules = data;

        factory.emitChanges();
    });

    factory.getModules = function(){
        return factory.data.modules;
    };

    return factory;
}

export default ModulesStore;