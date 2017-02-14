class HomeCtrl {
    constructor(AppConstants, $state, $window, $scope, $timeout) {
        'ngInject';

        if (RODIN && Object.keys(RODIN).length >= 8) return location.reload();

        this._$window = $window;
        this._$scope = $scope;
        this.appName = AppConstants.appName;

        this.windowHeight = this._$window.innerHeight;
        this.windowWidth = this._$window.innerWidth;


        //TODO temp stuff
        angular.forEach(angular.element('.sections'), (value, key) => {
            const section = angular.element(value);
            section.height(this.windowHeight);
        });

        this.iframe = angular.element('#iframe');
        this.initialIframeWidth = false;
        this.iframe.height(this.windowHeight);

        this.scrollHandler = this.scrollHandler.bind(this);
        this.handleIframeMessage = this.handleIframeMessage.bind(this);

        window.addEventListener('message', this.handleIframeMessage, false);
        document.body.addEventListener('wheel', this.scrollHandler, false);

        this.hoveredIframe = false;

        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(()=> {
                RODIN.landing();
                $('.code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            });

        });

    }

    handleIframeMessage(e) {
        const scroller = e.data.scroll;
        const wheeler = e.data.wheel;

        if (typeof scroller === 'boolean')
            this.hoveredIframe = scroller;

        if (typeof wheeler === 'boolean') {

            if (this.hoveredIframe) {
                angular.element('body').css({ overflow: 'auto' });
                this.disablePointer = true;
            } else {
                this.disablePointer = false;
            }

            this._$scope.$apply();
        }
    }

    scrollHandler(e) {
        const scrollPos = angular.element(document).scrollTop();

        const lastSlider = angular.element('.swiper-slide').last();
        const iframe = angular.element('#iframe');
        const innerWidth = iframe.innerWidth();
        const innerHeight = iframe.innerHeight();

        if (!this.initialIframeWidth)
            this.initialIframeWidth = iframe.innerWidth();

        // incerase iframe size
        if (lastSlider.hasClass('swiper-slide-active') && e.deltaY > 0 && (iframe.innerWidth() <= this.windowWidth)) {
            this.disablePointer = true;
            angular.element('.img-wrapper.iframe-wrapper').css( { 'position':'initial' } );
            //console.log('height', this.windowHeight);
            //console.log('width', this.windowWidth);

            angular.element('body').css({ overflow: 'auto' });
            iframe.width(innerWidth + 30);
            //iframe.height(innerHeight + 30);
        }

        //Stop parent events works in iframe
        if (iframe.innerWidth() >= this.windowWidth) {
            angular.element('body').css({ overflow: 'hidden' });
            this.disablePointer = false;
        }

        //decrease iframe size;
        if (e.deltaY < 0 && (iframe.innerWidth() > this.initialIframeWidth)) {
            angular.element('body').css({ overflow: 'auto' });
            if (!this.disablePointer) {
                this.disablePointer = true;
            }

            iframe.width(innerWidth - 20);

            if (!lastSlider.hasClass('swiper-slide-active'))
                iframe.width(600).height(400);

        }

        this._$scope.$apply();
    }

}

export default HomeCtrl;
