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
            autoplay: 3500,
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

                setTimeout( () => {
                    BANNER.showCodeBlock(codeBlock, devicePath, true);

                    setTimeout(()=>{
                        code.scrollLeft(60);
                        codeBlock.scrollTop(35);
                    }, 10)

                }, 500);

                BANNER.wResize();
            },

            onSlideChangeStart: function (slide) {
                codeBlock.animate({ opacity: 1 }, 300);
            },

            onSlideChangeEnd: function (slide) {
                let slideItem = $(slide.slides[slide.activeIndex]);
                let deviceName = slideItem.data('devicename');
                let devicePath = slideItem.find(
                    '.devices-svg .deviceScreen');
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


        let params = {
            width: devicePath[0].getBoundingClientRect().width - 10,
            height: devicePath[0].getBoundingClientRect().height - 20,
            top: devicePath[0].getBoundingClientRect().top,
            left: devicePath[0].getBoundingClientRect().left + 5,
        };
        if (init) {
            block.css(params);
        } else {
            block.animate(params);
        }

        if(codeBlock.length <= 0)
            codeBlock = $('.code-block-wrapper')
        if(code.length <= 0)
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
        let resize; let _this = this;
        $(window).resize(function () {
            // if (resize) {
            //     clearTimeout(resize);
            // }
            // resize = setTimeout(function() {
            //     _this.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
            // }, 5);
            _this.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
        });
    },
};
window.a = BANNER;

export default BANNER;
