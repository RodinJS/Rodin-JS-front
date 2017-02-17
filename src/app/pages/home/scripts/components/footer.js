'use strict';

const footer = {
    init: function () {
        this.toggleFooter();
    },

    toggleFooter: function () {
        $(document).on('click', '.btn-footer-expand', function (event) {
            event.preventDefault();
            const footer = $(this).closest('.footer');
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                footer.removeClass('open');
            } else {
                $(this).addClass('active');
                footer.addClass('open');
            }
        });
    },
};

export default footer;
