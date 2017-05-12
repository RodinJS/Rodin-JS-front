/**
 * Created by xgharibyan on 11/1/16.
 */


function ProjectStore(EventBus, BaseStore, $stateParams, $state, Project) {
    'ngInject';

    const factory = BaseStore(EventBus);
    factory.id = 'Project';

    EventBus.on(EventBus.project.SET, function (scope, data) {
        factory.data.project = data;
        factory.emitChanges();
    });

    factory.getProject = function () {
        if(factory.data.project && factory.data.project._id != $stateParams.projectId){
            Project.get($stateParams.projectId, {projectSize:true}).then(
                project => {
                    EventBus.emit(EventBus.project.SET, project);
                },
                err => {
                    $state.go('landing.error');
                });
        }
        const project = angular.copy(factory.data.project);
        delete factory.data.project;
        return project;
    };

    return factory;
}

export default ProjectStore;