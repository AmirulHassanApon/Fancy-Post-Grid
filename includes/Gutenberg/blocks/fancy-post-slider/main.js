jQuery(document).ready(function ($) {

    // --- Swiper Initialization with Unique ID Support --- Elementor
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
    // Gutenberg Swiper
    document.querySelectorAll('.swiper').forEach(function (swiperEl) {
        let options = swiperEl.dataset.swiper ? JSON.parse(swiperEl.dataset.swiper) : {};

        const finalOptions = {
            ...options,
            navigation: options.navigation ? {
                nextEl: swiperEl.querySelector(options.navigation.nextEl),
                prevEl: swiperEl.querySelector(options.navigation.prevEl),
            } : false,
            pagination: options.pagination ? {
                el: swiperEl.querySelector(options.pagination.el),
                clickable: options.pagination.clickable || false,
                type: options.pagination.type || 'bullets',
                dynamicBullets: options.pagination.dynamicBullets || false,
            } : false,
        };

        new Swiper(swiperEl, finalOptions);
    });

});
