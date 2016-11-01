function EventBus($rootScope) {
    'ngInject';
    const factory = {
        'project': {
            SET: 'projectObject'
        },
        emit: emit,
        on: on
    };

    function emit(event) {
        return $rootScope.$broadcast.apply($rootScope, arguments);
    }

    function on(event, cb) {
        return $rootScope.$on(event, cb);
    }

    return factory;
}

export default EventBus;