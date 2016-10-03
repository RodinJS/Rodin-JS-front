class DemoCtrl {
	constructor(User, $state, JWT) {
		'ngInject';

		this._User = User;
		this._$state = $state;

		this.title = $state.current.title;

		if (!JWT.get()) {
			User.login({
				username: "sculptor",
				password: "demo",
			}).then((res) => {
				$state.go('app.dashboard');
			})
		} else {
			$state.go('app.dashboard');
		}

	}
}

export default DemoCtrl;
