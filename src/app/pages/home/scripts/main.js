'use strict';

window.jQuery = window.$ = jQuery;


// PLUGINS
// -- parallax
import './plugins/parallax.js';
import './plugins/swiper.js';
import './plugins/jquery.tagsinput.min.js';
import './plugins/jquery.slimscroll.js';

// COMPONENTS
import header from './components/header';
import banner from './components/banner';
import features from './components/features';
import footer from './components/footer';

// main function

window.LANDING = {
    // ========== PAGES
    landing: function () {
        this.parallaxInit();
        this.verticalSlider();
        this.scroll();
        this.clicks();
        this.slimScroll();
        //this.focus();
        header.stickyHeader();
        banner.init();
        banner.orientationchange();
        features.init();

    },

    template: function () {
        this.tagsInput();
        header.toggleHeaderAuth();
    },
    // end ====== PAGES

    parallaxInit: function () {
        const scene = document.getElementById('parallax');
        if (scene) {
            const parallax = new Parallax(scene);
        }
    },

    verticalSlider: function () {
        let swiper = new Swiper('#projectSlider', {
            pagination: '#projectSlider .swiper-pagination',
            direction: 'vertical',
            // height: $(window).height(),
            // width: $(window).width(),
            // autoHeight: true,
            slidesPerView: 1,
            paginationClickable: true,
            // spaceBetween: 100,
            updateOnImagesReady: true,
            keyboardControl: true,
            speed: 1000,
            mousewheelControl: true,
            onTransitionEnd: function (swipe) {
                $('.slide-number').html('0' + (swipe.activeIndex + 1));
                if (swipe.activeIndex + 1 === swipe.slides.length) {
                    $('.btn-next-slide').addClass('last');
                } else {
                    $('.btn-next-slide').removeClass('last');
                }

                if (!swipe.isEnd) {
                    $('.slide-number').show();
                    $('.pagination-wrapper').show();
                    $('.btn-next-slide').show();
                }

                if (swipe.isEnd) {
                    if (checkMobile()) {
                        $('.btn-next-slide').hide();
                    }
                }

                swipe.activeIndex === 0 ?  $('.btn-next-slide').addClass('first') : $('.btn-next-slide').removeClass('first');

            },
        });
        $(document).on('click touch', '.btn-next-slide:not(.last)', function (e) {
            e.preventDefault();
            swiper.slideNext();
        });

        $(document).on('click touch', '.btn-next-slide.last', function (e) {
            e.preventDefault();
            // swiper.slidePrev();
            $('body').scope().$root.$broadcast('scrollDown', {});
        });

        this.projectSlider = swiper;
        $(window).on('orientationchange', function (event) {
            setTimeout(function () {
                swiper.update();
            }, 500);
        });
    },

    tagsInput: function () {
        let input = $('#tagsInput');
        if (input) {
            input.tagsInput({
                height: 'auto',
                width: '100%',
                interactive: true,
                defaultText: 'Small Description',
                placeholderColor: '#5B788E',
            });
        }
    },

    clicks: function () {
        footer.init();
        $(document).on('click touch', '.back-home-btn', function () {
            let modal = $('.project-modal');
            modal.removeClass('show animationEnd');
            $(window).scrollTop($(window).scrollTop() - 10);
        });
    },

    scroll: function () {
        let win = $(window);
        let _this = this;
        let txt = $('.footer .prompt-text');
        win.scroll(function () {
            if (win.scrollTop() + win.height() > $(document).height() - 74) {
                txt.addClass('is-show');
            } else {
                txt.removeClass('is-show');
            }

            if (win.scrollTop() + win.height() > $(document).height() - 1) {
                $('.project-modal').addClass('show');
                setTimeout(function () {
                    $('.project-modal').addClass('animationEnd');
                }, 1000);

                LANDING.projectSlider.update(true);
            }
        });
    },

    slimScroll: function () {
        $('#rodinCode').slimScroll({
            opacity: 0,
            height: '100%',
            allowPageScroll: false,
        });
    },

    focus: function () {
        var toggleCls = 'focus';
        $(document).on('focus', '#emailControl', function () {
            $(this).addClass(toggleCls).closest('.input-group').addClass(toggleCls);
        });

        $(document).on('click', '.form-backdrop', function (e) {
            $('#emailControl').removeClass(toggleCls).closest('.input-group').removeClass(toggleCls);
        });
    },

};

function checkMobile() {
    var check = false;
    (function (a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;})(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
