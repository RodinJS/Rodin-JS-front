import io from 'socket.io-client/dist/socket.io';

function SocketService(AppConstants, User, $rootScope){
	'ngInject';

	const socket = io(AppConstants.SOCKET+"/", {transports: ['websocket', 'polling'],  query: "token=" + User._JWT._$cookies.get('token') + ""});

    const Factory = {
		on: listener,
		emit: emitter
	};

	return Factory;


	function listener(eventName, callback) {
		socket.on(eventName,  (data) => {
			var args = arguments;
			$rootScope.$apply( () => {
				callback.apply(socket, args);
			});
		});
	}

	function emitter(eventName, data, callback) {
		socket.emit(eventName, data,  () => {
			var args = arguments;
			$rootScope.$apply( () => {
				if (callback) {
					callback.apply(socket, args);
				}
			});
		})
	}

}

export default SocketService;
