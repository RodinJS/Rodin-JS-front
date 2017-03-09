import footer from '../home/scripts/components/footer';

class FaqCtrl {
    constructor($scope) {
        'ngInject';
	    $scope.$on('$viewContentLoaded', () => {
		    $(document).ready(()=> {
			    footer.init();
		    });
	    });
    }
}
export default FaqCtrl;
