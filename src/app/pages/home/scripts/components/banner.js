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
            autoplay: 2500,
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
                        code.scrollLeft(90);
                        codeBlock.scrollTop(35);
                    }, 10);

                }, 500);

                BANNER.wResize();
            },

            onTransitionStart: function (slide) {
                if (codeBlock.length <= 0)
                    codeBlock = $('.code-block-wrapper');
                if (code.length <= 0)
                    code = $('#rodinCode code');
                codeBlock.animate({ opacity: 1 }, 300);
            },

            onTransitionEnd: function (slide) {
                let slideItem = $(slide.slides[slide.activeIndex]);
                let deviceName = slideItem.data('devicename');
                let devicePath = slideItem.find('.devices-svg .deviceScreen');
                if (deviceName === 'vive' ||
                    deviceName === 'daydream' ||
                    deviceName === 'oculus' ||
                    deviceName === 'samsungGear'
                ) {
                    codeBlock.addClass('round');
                } else {
                    codeBlock.removeClass('round');
                }

                BANNER.showCodeBlock(codeBlock, devicePath);
                BANNER.lastActivePath = devicePath;
            },

            onSlideChangeEnd: function (slide) {
                //console.log('end');

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

       /* let additionalParams = { l: 0, t: 0, w: 0, h: 0 };
        //console.log(this.checkMobile());
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



        //console.log(devicePath[0].getBoundingClientRect());

        let params = {
            width: devicePath[0].getBoundingClientRect().width - 20 + additionalParams.w,
            height: devicePath[0].getBoundingClientRect().height - 20,
            top: devicePath[0].getBoundingClientRect().top + window.pageYOffset + additionalParams.t,
            left: (devicePath[0].getBoundingClientRect().left + 10 + additionalParams.l) + minusLeft,
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
        */

        const minusTop= this.checkMobile() ? - 70 : 0;

        let params = {
            width: devicePath[0].getBoundingClientRect().width - 10,
            height: devicePath[0].getBoundingClientRect().height - 20,
            top: devicePath[0].getBoundingClientRect().top + window.pageYOffset + 10 + minusTop,
            left: devicePath[0].getBoundingClientRect().left + 5,
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

        /* $(window).scroll(() => {
             clearTimeout($.data(this, 'scrollCheck'));
             window.a.stopAutoplay();
             $.data(this, 'scrollCheck', setTimeout(() => {
                 window.a.startAutoplay();
             }, 250));

         });*/

    },

    orientationchange: function () {
        var _this = this;
        $(window).on('orientationchange', function (event) {
            _this.showCodeBlock(codeBlock, BANNER.lastActivePath, true);
        });
    },

    checkMobile() {
        var check = false;
        (function (a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;})(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
};
window.a = BANNER;

export default BANNER;
