class ContactsCtrl {
	constructor($window, $scope) {
		'ngInject';
		this._$scope = $scope;
		$window.scrollTo(0, 0);
		this.addMap = this.addMap.bind(this);
		this.init();
	}

	init() {
		this.addMap()
	}

	addMap() {
		let loc = {lat: 40.017901, lng: -105.276806};
		let options = {
			center: loc,
			zoom: 16,
			tilt: 30,
			zoomControl: true,
			disableDefaultUI: true,
			streetViewControl: true
		};
		this.map = new google.maps.Map(
			angular.element("#map")[0], options);
		let marker = new google.maps.Marker({
			position: loc,
			map: this.map,
			title: 'Rodin'
		});
	}
}
export default ContactsCtrl;
