import footer from '../home/scripts/components/footer';
import header from '../home/scripts/components/header';
class ContactsCtrl {
	constructor($window, $scope) {
		'ngInject';
		this._$scope = $scope;
		$window.scrollTo(0, 0);
		$scope.$on('$viewContentLoaded', () => {
			$(document).ready(() => {
				footer.init();
				header.init();
			});
		});
		this.addMap = this.addMap.bind(this);
		this.init();
	}

	init() {
		this.addMap()
	}

	addMap() {
		let loc = {lat: 33.771750, lng: -118.191130};
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
