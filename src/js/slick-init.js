$(document).ready(function() {
    $('.partners__kontainer').slick({
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $('#partners__arrow--prev'),
        nextArrow: $('#partners__arrow--next'),
        responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

$(document).ready(function() {
    $('.speakers__kontainer').slick({
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $('#speakers__arrow--prev'),
        nextArrow: $('#speakers__arrow--next'),
        responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});


$(document).ready(function() {
    $('.timeline').slick({
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.schedule__arrow--left'),
        nextArrow: $('.schedule__arrow--right'),
        arrows: true,
        responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});