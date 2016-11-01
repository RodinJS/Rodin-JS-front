/**
 * Created by xgharibyan on 11/1/16.
 */


function ProjectStore(EventBus, BaseStore) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Porject';

    EventBus.on(EventBus.project.SET, function (scope, data) {
        factory.data.project = data;
        factory.emitChanges();
    });

    factory.gerProject = function () {
        return factory.data.project;
    };

    return factory;
}

export default ProjectStore;