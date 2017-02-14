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
        this.animatingIframe = false;

        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(() => {
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
                angular.element('body').css({overflow: 'auto'});
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
        const iframeBox = angular.element('#iframe-box');
        const btnNextSlide = angular.element('.btn-next-slide');

        iframeBox.css({
            background: 'red'
        });

        const innerWidth = iframe.innerWidth();
        const innerHeight = iframe.innerHeight();

        if (!this.initialIframeWidth)
            this.initialIframeWidth = iframe.innerWidth();

        // incerase iframe size
        const isBottom = btnNextSlide.hasClass('last') && lastSlider.hasClass('swiper-slide-active');
        if (isBottom && e.deltaY > 0 && (iframeBox.innerWidth() < this.windowWidth) && !this.animatingIframe) {
            this.animatingIframe = true;

            this.disablePointer = true;

            let x = $(iframeBox[0]).offset().left - $('.slide-content.slide3').offset().left;
            let y = $(iframeBox[0]).offset().top - $('.slide-content.slide3').offset().top;

            if (!window.initialTransform)
                window.initialTransform = {x: x, y: y, w: iframeBox.width(), h: iframeBox.height()};

            angular.element('.img-wrapper.iframe-wrapper').css({'position': 'initial'});
            angular.element('.iframe-holder').css({'position': 'initial'});
            angular.element('body').css({overflow: 'auto'});


            $(iframeBox[0]).width(window.initialTransform.w);
            $(iframeBox[0]).height(window.initialTransform.h);
            $(iframeBox[0]).css({
                top: window.initialTransform.y,
                left: window.initialTransform.x,
            });

            $(iframeBox[0]).animate({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }, 500, () => {
                this.animatingIframe = false;
            });
        }

        //Stop parent events works in iframe
        if (iframe.innerWidth() >= this.windowWidth) {
            angular.element('body').css({overflow: 'hidden'});
            this.disablePointer = false;
        }

        if (isBottom && e.deltaY < 0 && window.initialTransform && !this.animatingIframe) {

            this.animatingIframe = true;
            $(iframeBox[0]).animate({
                top: window.initialTransform.y,
                left: window.initialTransform.x,
                width: window.initialTransform.w,
                height: window.initialTransform.h
            }, 500, () => {
                this.animatingIframe = false;
            });
        }

        this._$scope.$apply();
    }

}

export default HomeCtrl;
