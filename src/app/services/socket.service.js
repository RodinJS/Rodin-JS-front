import io from 'socket.io-client/dist/socket.io';

function SocketService(AppConstants, User, $rootScope){
	'ngInject';

	const socket = io(AppConstants.SOCKET+"/", {transports: ['websocket', 'polling'],  query: "token=" + User._JWT._$cookies.get('token') + ""});

    const Factory = {
    	connected:false,
		on: listener,
		emit: emitter
	};

    socket.on('connect', ()=> Factory.connected = true);

	return Factory;


	function listener(eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
	}

	function emitter(eventName, data, callback) {
		socket.emit(eventName, data,  function()  {
			var args = arguments;
			$rootScope.$apply( function() {
				if (callback) {
					callback.apply(socket, args);
				}
			});
		})
	}

}

export default SocketService;
