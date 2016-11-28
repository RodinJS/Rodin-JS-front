import io from 'socket.io-client/dist/socket.io';

function SocketService(AppConstants, User, $rootScope){
	'ngInject';

	const socket = io(AppConstants.API+"/", {transports: ['websocket', 'polling'],  query: "token=" + User._JWT._$cookies.get('token') + ""});

    console.log(socket);

    const Factory = {
		on: listener,
		emit: emitter
	};

	Factory.on('projectTranspiled', (data)=>{
		console.log(data);
	});

	return Factory;


	function listener(eventName, callback) {
		socket.on(eventName, function (data) {
			var args = arguments;
			$rootScope.$apply(function () {
				callback.apply(socket, args);
			});
		});
	}

	function emitter(eventName, data, callback) {
		socket.emit(eventName, data, function () {
			var args = arguments;
			$rootScope.$apply(function () {
				if (callback) {
					callback.apply(socket, args);
				}
			});
		})
	}

}


/*class SocketService {
	constructor(AppConstants, User) {
		'ngInject';

		this._AppConstants = AppConstants;
		this.User = User;

	}


	/!*listener(eventName, callback) {
		socket.on(eventName, function (data) {
			var args = arguments;
			$rootScope.$apply(function () {
				callback.apply(socket, args);
			});
		});
	}

	emitter(eventName, data, callback) {
		socket.emit(eventName, data, function () {
			var args = arguments;
			$rootScope.$apply(function () {
				if (callback) {
					callback.apply(socket, args);
				}
			});
		})
	}*!/

}*/
export default SocketService;