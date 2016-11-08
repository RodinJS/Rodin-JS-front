class BillingCrtl {
	constructor(AppConstants, User, $scope, Validator, Error) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.currentUser = User.current;
		this.formData = {};



		$scope.$watch('User.current', (newUser) => {
			this.currentUser = newUser;
		});

	}

	updateProfile(isValidForm = true) {
		console.log("currentUser", this.currentUser);
		if (!isValidForm) {
			return;
		}


		Validator.validate([
			{
				name: "avatar",
				value: scope.UserGeneralInfo.avatar,
				conditions: {}
			},
			{
				name: "name",
				value: scope.UserGeneralInfo.name,
				conditions: {
					required: true,
					pattern: scope.patterns.name
				}
			},
			{
				name: "state",
				value: scope.UserGeneralInfo.state,
				conditions: {}
			},
			{
				name: "country",
				value: scope.UserGeneralInfo.country,
				conditions: {}
			}
		]);

		if (Validator.isValid()) {
			var data = Validator.getData();
			data.avatar = data.avatar || "";

			User.update(Validator.getData()).then(function (data) {
				Notification.success('Your profile successfully updated.');
			}, function (data) {
				Error.show(data, scope.profileForm, scope);
			});
		} else {
			Error.show(Validator.getErrors(), this.formData, scope);
		}

	}
}

export default BillingCrtl;
