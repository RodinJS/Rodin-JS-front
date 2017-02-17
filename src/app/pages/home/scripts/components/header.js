'use strict';

const header = {
    init: function () {
        this.stickyHeader();
        this.toggleHeaderAuth();
    },

    stickyHeader: function () {
        var fading = $('.header-backdrop');

        var fadeStart = 0,
            fadeUntil = 40;
        $(window).scroll(function () {
            var $scroll = $(window).scrollTop();
            var opacity = 0;

            if ($scroll <= fadeStart) {
                opacity = 0;
            } else if ($scroll <= fadeUntil) {
                opacity = $scroll / fadeUntil;
            } else {
                opacity = 1;
            }

            fading.css('opacity', opacity);
            if ($(this).scrollTop() > 0) {
                $('.header').addClass('sticky');
                $('body').addClass('sticky-header');
            } else {
                $('.header').removeClass('sticky');
                $('body').removeClass('sticky-header');
            }
        });
    },

    toggleHeaderAuth: function () {
        $('.btn-mobile-menu').on('click', function (event) {
            event.preventDefault();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.header-menu').slideUp();
                $('.account-action').slideUp();
            } else {
                $(this).addClass('active');
                $('.header-menu').slideDown();
                $('.account-action').slideDown();
            }
        });
    },

};

export default header;
