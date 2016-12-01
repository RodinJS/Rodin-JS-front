function EventBus($rootScope) {
    'ngInject';
    const factory = {
        project: {
            SET: 'projectObject'
        },
        notifications:{
          SET:'notificationsObj',
          DELETE:'notificationIndex',
          UPDATE:'notificationUpdateIndex'
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