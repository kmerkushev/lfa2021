let channels = document.querySelectorAll(`.main__program .channels a`);

if (!channels[0]) {
    channels = document.querySelectorAll(`.main__channels.channels a`);
}

if (channels[0]) {
    if (document.documentElement.clientWidth < 660) {
        channels[0].classList.add(`channels__channel--highlighted`);
    }

    $('.timeline').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        if (document.documentElement.clientWidth < 660) {
            for (let index = 0; index < channels.length; index++) {
                channels[index].classList.remove(`channels__channel--highlighted`);
            }
            channels[currentSlide].classList.add(`channels__channel--highlighted`);
        }
    });
}