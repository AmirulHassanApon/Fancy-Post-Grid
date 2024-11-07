jQuery(document).ready(function($) {
    // Project Filter - jQuery
    if ($('.filter-button-group button').length) {
        var projectfiler = $('.filter-button-group button');
        if (projectfiler.length) {
            $('.filter-button-group button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });
        }
    }

    // Swiper Initialization - Vanilla JS
    let defaults = {
        spaceBetween: 5,
        slidesPerView: 1
    };

    initSwipers(defaults);

    function initSwipers(defaults = {}, selector = ".swiper") {
        let swipers = document.querySelectorAll(selector);
        swipers.forEach((swiper) => {
            // get options
            let optionsData = swiper.dataset.swiper
                ? JSON.parse(swiper.dataset.swiper)
                : {};

            let options = {
                ...defaults,
                ...optionsData
            };

            // init Swiper
            new Swiper(swiper, options);
        });
    }

    // Initialize additional Swiper instance with navigation
    var swiper = new Swiper(".rs-mySwiper", {
        spaceBetween: 5,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Initialize Isotope after all images are loaded
    var $grid = $('.rs-grid').isotope({
        itemSelector: '.rs-grid-item',
        layoutMode: 'fitRows'
    });

    // Filter items on button click
    $('.filter-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        
        // Add 'active' class to the clicked button
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
    });
});
