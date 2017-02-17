'use strict';

const videos = {
    createProject: [
     '/images/landing/content/video-img.jpg',
     '/video/createproject.mp4',
     '/video/createproject.webm',
    ],
    develope: [
     '/images/landing/content/video-img.jpg',
     './video/develope.mp4',
     './video/develope.webm',
    ],
    deploy: [
     '/images/landing/content/video-img.jpg',
     './video/deploy.mp4',
     './video/deploy.webm',
    ],
};

const vision = {

    video: function () {
        return document.getElementById('rodinVision');
    },

    init: function () {
        if (!this.video()) return;
        vision.playNextVideo();

        $(document).on('click', '.video-play-btn', function (e) {
            e.preventDefault();
            var videoName = $(this).data('videoname');
            if (videoName) {
                vision.switchVideo(videoName);
            } else {
                vision.playPause();
            }
        });

        $(vision.video()).on('click', vision.playPause);
    },

    switchVideo: function (name) {
        if (!name) name = 'develope';

        var mp4 = $('#mp4');
        if (videos[name][1] === mp4.attr('src')) {
            vision.playPause();
            return;
        } else {
            var webm = $('#webm');
            var parent = mp4.parent();

            $(vision.video()).attr('poster', videos[name][0]);
            $(vision.video()).attr('mediaGroup', name);
            mp4.attr('src', videos[name][1]);
            webm.attr('src', videos[name][2]);

            $(vision.video()).width = 0;
            $(vision.video()).height = 0;
            $(vision.video()).load();
            vision.playPause();
        }
    },

    playPause: function () {
        var videoWrapper = $(vision.video().parentElement);
        var btn = $('.video-play-btn[data-videoname="' + $(vision.video()).attr('mediaGroup') + '"]');
        $('.video-play-btn').removeClass('active');
        if (vision.video().paused) {
            vision.video().play();
            videoWrapper.addClass('play');
            btn.addClass('active playing');
        } else {
            vision.video().pause();
            videoWrapper.removeClass('play');
            btn.addClass('active').removeClass('playing');
        }
    },

    playNextVideo: function () {
        vision.video().addEventListener('ended', function (e) {
            var videoName = $(e.target).attr('mediagroup');
            var currentPlayBtn = $('[data-videoname="' + videoName + '"]');
            var nextVideoName = currentPlayBtn.next().length ? currentPlayBtn.next().data('videoname') : 'createProject';
            vision.switchVideo(nextVideoName);
        }, false);
    },

};

export default vision;
