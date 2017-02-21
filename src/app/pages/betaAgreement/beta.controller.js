import footer from '../home/scripts/components/footer';
import header from '../home/scripts/components/header';

class BetaCtrl {
    constructor($scope) {
        'ngInject';
        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(()=> {
                footer.init();
                header.init();
            });

        });
    }
}
export default BetaCtrl;
