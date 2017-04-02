import footer from '../home/scripts/components/footer';
import header from '../home/scripts/components/header';
class PrivacyCtrl {
    constructor($window, $scope) {
        'ngInject';
        $window.scrollTo(0, 0);
        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(()=> {
                footer.init();
                header.init();
            });

        });
    }
}
export default PrivacyCtrl;
