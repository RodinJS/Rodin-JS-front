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
        this.initIframeData = this.initIframeData.bind(this);
        this.resetInitalPosition = this.resetInitalPosition.bind(this);
        this.outToSlider = this.outToSlider.bind(this);
        window.addEventListener('message', this.handleIframeMessage, false);
        document.body.addEventListener('wheel', this.scrollHandler, false);

        this.hoveredIframe = false;

        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(() => {
                RODIN.landing();
                $('.code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });

                $('.back-home-btn').on('click', () =>  this.outToSlider());

            });

        });
    }

    outToSlider() {
        RODIN.projectSlider.unlockSwipeToPrev();
        RODIN.projectSlider._slideTo(0, 500);
        this.resetInitalPosition();
        $('.project-modal').removeClass('show animationEnd');
        $(window).scrollTop($(window).scrollTop() - 10);
        this.canOutFromSlider = false;

    }

    initIframeData() {
        this.$iframeBox = $('#iframe-box');
        const $slide3 = $('.slide-content.slide3');
        const x = this.$iframeBox.offset().left - $slide3.offset().left;
        const y = this.$iframeBox.offset().top - $slide3.offset().top;
        this.initialTransform = { x: x, y: y, w: this.$iframeBox.width(), h: this.$iframeBox.height() };
        this.$iframeBox.css({
            width: this.initialTransform.w,
            height: this.initialTransform.h,
            top: this.initialTransform.y,
            left: this.initialTransform.x,
        });

    }

    resetInitalPosition() {
        if (this.initialTransform) {
            $('#iframe-box').css({
                width: this.initialTransform.w,
                height: this.initialTransform.h,
                top: this.initialTransform.y,
                left: this.initialTransform.x,
            });
        }

    }

    handleIframeMessage(e) {
        const scroller = e.data.scroll;
        const wheeler = e.data.wheel;

        if (typeof scroller === 'boolean')
            this.hoveredIframe = scroller;

        //console.log('wheel', wheeler);
        //console.log('scroller', scroller);
        //console.log('this.hoveredIframe', this.hoveredIframe);

        if (typeof wheeler === 'boolean') {

            if (this.hoveredIframe) {
                angular.element('body').css({ overflow: 'auto' });
                this.disablePointer = true;
            } else {
                //angular.element('body').css({ overflow: 'hidden' });
                this.disablePointer = false;
            }

            angular.element("#iframe").focus();
            this._$scope.$apply();
        }
    }

    scrollHandler(e) {

        const lastSlider = angular.element('.swiper-slide').last();
        const iframe = angular.element('#iframe');
        const $iframeBox = $('#iframe-box');
        const btnNextSlide = angular.element('.btn-next-slide');

        if (!this.initialLeft && !this.initialTop) {
            this.initialLeft = $iframeBox[0].offsetLeft;
            this.initialTop = $iframeBox[0].offsetTop;
            if (!this.$iframeBox) this.initIframeData();
            $('.img-wrapper.iframe-wrapper').css({ position: 'initial' });
            $('.iframe-holder').css({ position: 'initial' });
        }

        if (!this.initialIframeWidth)
            this.initialIframeWidth = iframe.innerWidth();

        // incerase iframe size
        const isBottom = btnNextSlide.hasClass('last') && lastSlider.hasClass('swiper-slide-active');

        if (this.canOutFromSlider){
           return this.outToSlider();
        }


        if (!btnNextSlide.hasClass('last')) {
            this.canOutFromSlider = e.deltaY < 0 && RODIN.projectSlider.isBeginning && btnNextSlide.hasClass('first');

            $('body').css({ overflow: 'auto' });
            $('.slide-number').show();
            $('.pagination-wrapper').show();
            return btnNextSlide.show();
        }

        if (isBottom && e.deltaY > 0 && ($iframeBox.innerWidth() < this.windowWidth)) {

            this.disablePointer = true;

            $('body').css({ overflow: 'hidden' });
            $('.slide-number').hide();
            $('.pagination-wrapper').hide();
            btnNextSlide.hide();

           /* const calcTop = $iframeBox[0].offsetTop - (this.initialTop / 2);
            const calcLeft = $iframeBox[0].offsetLeft - (this.initialLeft / 2);
            const calcWidth = this.$iframeBox.width() + ((this.windowWidth - this.initialTransform.w) / 6);
            const calcHeigth = this.$iframeBox.height() + ((this.windowHeight - this.initialTransform.h) / 6);

            const top = calcTop <= 0 ? 0 : calcTop;
            const left = calcLeft <= 0 ? 0 : calcLeft;
            const width = calcWidth < this.windowWidth ? calcWidth : this.windowWidth;
            const height = calcHeigth < this.windowWidth ? calcHeigth : this.windowHeight;*/

            $iframeBox.css({
                width: this.windowWidth,
                height: this.windowHeight,
                left: 0,
                top: 0,
            });

            iframe.focus();

            RODIN.projectSlider.lockSwipeToPrev();

        }

        //Stop parent events works in iframe
        if ($iframeBox.innerWidth() >= this.windowWidth) {
            angular.element('body').css({ overflow: 'hidden' });
            this.disablePointer = false;
        }

        if (isBottom && e.deltaY < 0) {
           /* const calcTop = this.$iframeBox[0].offsetTop + (this.initialTop / 2);
            const calcLeft = this.$iframeBox[0].offsetLeft + (this.initialLeft / 2);
            const calcWidth = this.$iframeBox.width() - ((this.windowWidth - this.initialTransform.w) / 6);
            const calcHeigth = this.$iframeBox.height() - ((this.windowHeight - this.initialTransform.h) / 6);

            const top = calcTop < this.initialTransform.y ? calcTop : this.initialTransform.y;
            const left = calcLeft < this.initialTransform.x ? calcLeft : this.initialTransform.x;
            const width = calcWidth > this.initialTransform.w ? calcWidth : this.initialTransform.w;
            const height = calcHeigth > this.initialTransform.h ? calcHeigth : this.initialTransform.h;*/

            $iframeBox.css({
                width: this.initialTransform.w,
                height: this.initialTransform.h,
                left: this.initialTransform.x,
                top: this.initialTransform.y,
            });

            if ($iframeBox.width() <= this.initialTransform.w) {
                RODIN.projectSlider.unlockSwipeToPrev();
                angular.element('body').css({ overflow: 'auto' });
            }

        }

        this._$scope.$apply();
    }

}

export default HomeCtrl;
