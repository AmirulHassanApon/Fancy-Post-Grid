jQuery(document).ready(function ($) {

    // --- Swiper Initialization with Unique ID Support ---
    document.querySelectorAll('.swiper').forEach(function (swiperEl) {
        let options = swiperEl.dataset.swiper ? JSON.parse(swiperEl.dataset.swiper) : {};

        // If navigation elements are defined, make sure to select the right DOM nodes
        let finalOptions = {
            ...options,
            navigation: options.navigation ? {
                nextEl: options.navigation.nextEl,
                prevEl: options.navigation.prevEl,
            } : false,
            pagination: options.pagination ? {
                el: options.pagination.el,
                clickable: options.pagination.clickable || false,
                type: options.pagination.type || 'bullets',
            } : false,
        };

        new Swiper(swiperEl, finalOptions);
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.swiper-container').forEach(function (swiperEl) {
            const config = swiperEl.getAttribute('data-swiper');
            if (!config) return;

            let swiperOptions = JSON.parse(config);

            // Resolve pagination element
            if (swiperOptions.pagination && typeof swiperOptions.pagination.el === 'string') {
                swiperOptions.pagination.el = swiperEl.querySelector(swiperOptions.pagination.el);
            }

            // Resolve navigation elements
            if (swiperOptions.navigation) {
                if (swiperOptions.navigation.nextEl)
                    swiperOptions.navigation.nextEl = swiperEl.querySelector(swiperOptions.navigation.nextEl);
                if (swiperOptions.navigation.prevEl)
                    swiperOptions.navigation.prevEl = swiperEl.querySelector(swiperOptions.navigation.prevEl);
            }

            new Swiper(swiperEl, swiperOptions);
        });
    });
    $('.fpg-section-area').each(function () {
        var $section = $(this);
        var $grid = $section.find('.rs-grid');
        var $filters = $section.find('.filter-button-group');

        // Wait until images are loaded
        $grid.imagesLoaded(function () {
            $grid.isotope({
                itemSelector: '.rs-grid-item',
                layoutMode: 'fitRows'
            });

            $filters.on('click', 'button', function (e) {
                e.preventDefault();

                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });

                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        });
    });
    /* MagnificPopup video view */
    // $(".popup-video").magnificPopup({
    //     type: "iframe",
    // });
    $(".popup-video").magnificPopup({
        type: "iframe",
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[?&]v=([^&]+)/);
                        return m && m[1] ? m[1] : null;
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                youtu_be: {
                    index: 'youtu.be/',
                    id: function(url) {
                        var m = url.match(/youtu\.be\/([^?]+)/);
                        return m && m[1] ? m[1] : null;
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/vimeo\.com\/(\d+)/);
                        return m && m[1] ? m[1] : null;
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });
    $(document).ready(function(){
      let filters = {
        opacity:70,
        brightness: 50
      }
      let containment = $('.ytbdVideo');
      let option = {
        autoPlay: true,
      videoURL: 'https://www.youtube.com/watch?v=tq75nkjL6a8',
        mute: true,
        showControls: false,
        loop: true,
        containment: containment,
        loop: true,
        autoPlay: true,
        startAt: 0,
        stopMovieOnBlur: false
      }
      

    });

    jQuery(document).ready(function($){
        $(".ytbdVideo").YTPlayer();
    });
});
