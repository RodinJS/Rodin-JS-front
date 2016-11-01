
function BaseStore (EventBus){
    'ngInject';

    function getBaseStore(){
        const factory = {
            EventBus: EventBus,
            id: 'none',
            data: {
                initialised: false
            },

            subscribe: subscribe,
            subscribeAndInit: subscribeAndInit,
            emitChanges: emitChanges,
            getData: getData,
            setData: setData,
            notInitialised: notInitialised
        };

        function subscribe(scope, cb) {
            return scope.$on(this.id, cb);
        }

        function subscribeAndInit(scope, cb) {
            cb();
            return scope.$on(this.id, cb);
        }

        function emitChanges() {
            this.data.initialised = true;
            this.EventBus.emit(this.id);
        }

        function getData() {
            return this.data;
        }

        function setData(data) {
            this.data = data;
        }

        function notInitialised() {
            return !this.data.initialised;
        }

        return factory;
    }

    return getBaseStore;

}

export default BaseStore;