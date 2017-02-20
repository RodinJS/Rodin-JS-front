'use strict';

let codeBlock = $('.code-block-wrapper');
let code = $('#rodinCode code');
const BANNER = {
    init: function () {
        this.initDevicesSlider();
        this.mobileMenuToggle();
    },

    initDevicesSlider: function () {
        let options = {
            effect: 'coverflow',
            grabCursor: false,
            centeredSlides: true,
            keyboardControl: true,
            slidesPerView: 'auto',
            pagination: '#devicesSlider .swiper-pagination',
            paginationClickable: true,
            bulletClass: 'devices-logo',
            speed: 1200,
            loop: true,
            autoplay: 3500,//3500
            autoplayDisableOnInteraction: false,
            coverflow: {
                rotate: -5,
                stretch: 0,
                depth: 1000,
                modifier: 1,
                slideShadows: false,
            },
        };

        options = $.extend({}, options, {
            paginationBulletRender: function (swiper, index, className) {
                let deviceName = $(swiper.slides[index]).data('devicename');
                return '<span class="icon-' + deviceName + ' ' + className +
                    '"></span>';
            },

            breakpoints: {
                767: {
                    slidesPerView: 'auto',
                    effect: 'slide',
                },
            },
            onInit: function (slide) {
                let devicePath = $(slide.slides[slide.activeIndex]).find('.devices-svg .deviceScreen');
                BANNER.lastActivePath = devicePath;
                setTimeout(() => {
                    BANNER.showCodeBlock(codeBlock, devicePath, true);
                    setTimeout(()=> {
                        code.scrollLeft(60);
                        codeBlock.scrollTop(35);
                    }, 10);

                }, 500);

                BANNER.wResize();
            },

            onTransitionStart: function (slide) {
                codeBlock.animate({ opacity: 1 }, 300);
            },

            onSlideChangeEnd: function (slide) {
                let slideItem = $(slide.slides[slide.activeIndex]);
                let deviceName = slideItem.data('devicename');
                let devicePath = slideItem.find('.devices-svg .deviceScreen');
                if (deviceName === 'vive' || deviceName === 'daydream' ||
                    deviceName === 'samsungGear') {
                    codeBlock.addClass('round');
                } else {
                    codeBlock.removeClass('round');
                }
                BANNER.showCodeBlock(codeBlock, devicePath);
                BANNER.lastActivePath = devicePath;
            },

            onSliderMove: function () {
                $('#plcDevice').remove();
            },

            onTouchEnd: function () {
                setTimeout(function () {
                    $('#plcDevice').remove();
                }, 10);
            },
        });

        if ($(window).width() > 767) {
            options.onSlideChangeStart = function (slide) {
                codeBlock.animate({ opacity: 1 }, 300);
                let devices = BANNER.cloneDevice(slide);
                devices.animate({ opacity: 0 }, {
                    duration: slide.params.speed - 500,
                    easing: 'swing',
                    always: function () {
                        this.remove();
                    },
                });
            };
        }

        window.a = BANNER.slider = new Swiper('#devicesSlider', options);

    },

    cloneDevice: function (slide) {
        let device = $(slide.slides[slide.previousIndex]).find('.devices-svg');
        let plcDevice = device.clone().attr('id', 'plcDevice')
            .css({
                position: 'absolute',
                'z-index': 1030,
                top: 0,
                left: device.position().left,
                width: device.outerWidth(),
                heith: device.outerHeight(),
            });

        $(slide.container).append(plcDevice);
        return plcDevice;
    },

    showCodeBlock: function (block, devicePath, init) {

        //console.log(devicePath[0].getBoundingClientRect());
        //console.log(devicePath[0].parentNode.id);

        let additionalParams = { l: 0, t: 0, w: 0, h: 0 };
        switch (devicePath[0].parentNode.id){
            case 'samsungGear':
                additionalParams.l = 15;
                additionalParams.w = -15;
                break;
            case 'oculus':
                additionalParams.l = 10;
                additionalParams.w = -15;
                break;
            case 'vive':
                additionalParams.l = 10;
                additionalParams.t = 10;
                additionalParams.w = -10;
                break;
            case 'daydream':
                additionalParams.l = 10;
                break;
        }

        let params = {
            width: devicePath[0].getBoundingClientRect().width - 20 + additionalParams.w,
            height: devicePath[0].getBoundingClientRect().height - 20,
            top: devicePath[0].getBoundingClientRect().top + window.pageYOffset + additionalParams.t,
            left: devicePath[0].getBoundingClientRect().left + 10 + additionalParams.l,
        };
        if (init) {
            block.css(params);
        } else {
            block.animate(params);
        }

        if (codeBlock.length <= 0)
            codeBlock = $('.code-block-wrapper');
        if (code.length <= 0)
            code = $('#rodinCode code');

        codeBlock.css({ opacity: 1 });
    },

    mobileMenuToggle: function () {
        $('#HeaderNavber').unbind('shown.bs.collapse hidden.bs.collapse');
        $('#HeaderNavber').on('shown.bs.collapse', function () {
            BANNER.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
        });

        $('#HeaderNavber').on('hidden.bs.collapse', function () {
            BANNER.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
        });
    },

    wResize: function () {
        let windowWidth = $(window).width();
        // Resize Event
        $(window).resize(() => {
            if ($(window).width() != windowWidth) {
                windowWidth = $(window).width();
                this.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
            }
        });

        $(window).scroll(() => {
            clearTimeout($.data(this, 'scrollCheck'));
            window.a.stopAutoplay();
            $.data(this, 'scrollCheck', setTimeout(() => {
                window.a.startAutoplay();
            }, 250));

        });

    },
};
window.a = BANNER;

export default BANNER;
