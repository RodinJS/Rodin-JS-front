'use strict';

window.jQuery = window.$ = jQuery;


// PLUGINS
// -- parallax
import './plugins/parallax.js';
import './plugins/swiper.js';
import './plugins/jquery.tagsinput.min.js';

// COMPONENTS
import header from './components/header';
import banner from './components/banner';
import features from './components/features';
import vision from './components/vision';
import footer from './components/footer';

// main function

window.LANDING = {
    // ========== PAGES
    landing: function () {
        this.parallaxInit();
        this.verticalSlider();
        this.scroll();
        this.clicks();
        header.stickyHeader();
        banner.init();
        features.init();
        vision.init();
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
            height: $(window).height(),
            width: $(window).width(),
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 100,
            keyboardControl: true,
            speed: 1000,
            mousewheelControl: true,
            onTransitionEnd: function (swipe) {
                $('.slide-number').html('0' + (swipe.activeIndex + 1)),
                    swipe.activeIndex + 1 === swipe.slides.length ? $('.btn-next-slide').addClass('last') : $('.btn-next-slide').removeClass('last');
                swipe.activeIndex === 0 ?  $('.btn-next-slide').addClass('first') : $('.btn-next-slide').removeClass('first');
            },
        });
        $(document).on('click', '.btn-next-slide:not(.last)', function (e) {
            e.preventDefault();
            swiper.slideNext();
        });

        $(document).on('click', '.btn-next-slide.last', function (e) {
            e.preventDefault();
            swiper.slidePrev();
        });

        this.projectSlider = swiper;
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
        $(document).on('click', '.back-home-btn', function () {
            let modal = $('.project-modal');
            modal.removeClass('show animationEnd');
            $(window).scrollTop($(window).scrollTop() - 10);
        });
    },

    scroll: function () {
        let win = $(window);
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
};
