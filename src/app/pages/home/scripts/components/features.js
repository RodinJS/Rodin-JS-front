'use strict';

const features = {
    init: function () {
        $(document).on('mouseover', '.features-item', function () {
            if ($(this).hasClass('active')) return;
            var slideName = $(this).data('slidename');
            var slideWrap = $(this).closest('.section-features').find('.features-slide-wrapper');
            slideWrap.find('img').fadeOut();
            $('img[data-name="' + slideName + '"]').fadeIn();
            $('.features-item').removeClass('active');
            $(this).addClass('active');
        });
    },

};

export default features;
