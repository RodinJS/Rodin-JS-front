import  './scripts/main';

class HomeCtrl {
    constructor(AppConstants, $state, $window, $scope, $timeout) {
        'ngInject';

        if (LANDING && Object.keys(LANDING).length >= 8) return location.reload();

        this._$window = $window;
        this._$scope = $scope;
        this.appName = AppConstants.appName;

        this.windowHeight = this._$window.innerHeight;
        this.windowWidth = this._$window.innerWidth;
        this.listenerAdded = false;


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
        this.isMobile = this.checkMobile();

        $scope.$on('$viewContentLoaded', () => {
            $(document).ready(() => {
                LANDING.landing();
                $('.code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });

                $('.back-home-btn').on('click', () =>  this.outToSlider());

            });

        });
    }

    outToSlider() {
        LANDING.projectSlider.unlockSwipeToPrev();
        LANDING.projectSlider._slideTo(0, 500);
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

        console.log('wheel', wheeler);
        console.log('scroller', scroller);
        console.log('this.hoveredIframe', this.hoveredIframe);

        if (typeof wheeler === 'boolean') {

            if (this.hoveredIframe) {
                //angular.element('body').css({ overflow: 'auto' });
                this.disablePointer = true;
            } else {
                //angular.element('body').css({ overflow: 'hidden' });
                this.disablePointer = false;
            }

        }
        this._$scope.$apply();
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
            this.canOutFromSlider = e.deltaY < 0 && LANDING.projectSlider.isBeginning && btnNextSlide.hasClass('first');

            $('body').css({ overflow: 'auto' });
            $('.slide-number').show();
            $('.pagination-wrapper').show();
            return btnNextSlide.show();
        }

        if(!this.isMobile){
            if (isBottom && e.deltaY > 0 && ($iframeBox.innerWidth() < this.windowWidth)) {

                this.disablePointer = true;

                $('body').css({ overflow: 'hidden' });
                $('.slide-number').hide();
                $('.pagination-wrapper').hide();
                btnNextSlide.hide();
                $iframeBox.css({
                    width: this.windowWidth,
                    height: this.windowHeight,
                    left: 0,
                    top: 0,
                });

                iframe.focus();

                LANDING.projectSlider.lockSwipeToPrev();

            }

            //Stop parent events works in iframe
            if ($iframeBox.innerWidth() >= this.windowWidth) {
                angular.element('body').css({ overflow: 'hidden' });
                this.disablePointer = false;
                this.hoveredIframe = false;
            }

            if (isBottom && e.deltaY < 0) {
                $iframeBox.css({
                    width: this.initialTransform.w,
                    height: this.initialTransform.h,
                    left: this.initialTransform.x,
                    top: this.initialTransform.y,
                });

                if ($iframeBox.width() <= this.initialTransform.w) {
                    LANDING.projectSlider.unlockSwipeToPrev();
                    angular.element('body').css({ overflow: 'auto' });
                }

            }

            this._$scope.$apply();
        }

    }

    checkMobile(){
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

}

export default HomeCtrl;
