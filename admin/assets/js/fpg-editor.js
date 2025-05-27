jQuery(window).on('elementor:init', function () {
    elementor.hooks.addAction('panel/open_editor/widget', function (panel, model) {
        const layoutInput = panel.$el.find('[data-setting="fancy_post_grid_layout"] input');
        const thumbSelect = panel.$el.find('[data-setting="thumbnail_size"] select');
        const buttonType = panel.$el.find('[data-setting="button_type"] select');

        // Exit early if any required fields are missing
        if (!layoutInput.length || !thumbSelect.length || !buttonType.length) {
            return;
        }

        const layoutMap = {
            gridstyle01: { thumb: 'fancy_post_custom_size', button: 'fpg-flat' },
            gridstyle02: { thumb: 'fancy_post_custom_size', button: 'fpg-border' },
            gridstyle03: { thumb: 'fancy_post_custom_size', button: 'fpg-filled' },
            gridstyle04: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle05: { thumb: 'fancy_post_square', button: 'fpg-filled' },
            gridstyle06: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle07: { thumb: 'fancy_post_square', button: 'fpg-filled' },
            gridstyle08: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle09: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle10: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle11: { thumb: 'fancy_post_landscape', button: 'fpg-filled' },
            gridstyle12: { thumb: 'fancy_post_square', button: 'fpg-filled' }
        };

        layoutInput.on('change', function () {
            const selectedLayout = layoutInput.filter(':checked').val();
            const config = layoutMap[selectedLayout] || {
                thumb: 'fancy_post_custom_size',
                button: 'fpg-filled'
            };

            thumbSelect.val(config.thumb).trigger('change');
            buttonType.val(config.button).trigger('change');
        });
    });
});
