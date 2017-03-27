class SamplesCtrl {
	constructor($scope, $http, $sce) {
		'ngInject'
		this._$scope = $scope;
		this._$sce = $sce;
		this._$http = $http;
		this.samples = {};
		this.activeLink = '';
		this.setActiveLink = this.setActiveLink.bind(this);
		this.init = this.init.bind(this);
		this.setDefaultStates = this.setDefaultStates.bind(this);
		this.init();
	}

	init() {
		let iframeContent = angular.element('.samples-iframe');
		iframeContent.css({ height: window.innerHeight - 91 });
		this._$http.get('https://examples.rodin.io/list.json')
			.then(res => {
				this.samples = res.data;
				let first = Object.keys(this.samples)[0];
				this.setDefaultStates(first, this.samples[first].url, this.samples[first].git);
			})
	}

	setActiveLink(key) {
		return this.setDefaultStates(key, this.samples[key].url, this.samples[key].git)
	}

	setDefaultStates(name, src, git) {
		this.sampleName = name
		this.activeLink = this._$sce.trustAsResourceUrl(src);
		this.sourceLink = this._$sce.trustAsResourceUrl(git);
	}

}

export default SamplesCtrl;
