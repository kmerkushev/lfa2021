let channels = document.querySelector(`.main`).querySelectorAll(`.channels__channel`);
let scheduleTimelineWrappers = document.querySelectorAll(`.schedule__timeline-wrapper`);

if (channels[0]) {
    $('.timeline').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        if (document.documentElement.clientWidth < 660) {
            for (let index = 0; index < channels.length; index++) {
                channels[index].classList.remove(`channels__channel--highlighted`);
                channels[index].classList.remove(`channels__channel--current`);
            }
            channels[nextSlide].classList.add(`channels__channel--highlighted`);
        }

        for (let index = 0; index < scheduleTimelineWrappers.length; index++) {
            $('.schedule__timeline-wrapper:nth-of-type(' + (index + 1) + ') .timeline').slick('slickGoTo', nextSlide);
        }
    });
}