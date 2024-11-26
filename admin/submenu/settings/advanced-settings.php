<?php
/**
 * Render the Advanced Settings page
 */
function fancy_post_grid_render_advanced_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Advanced Settings', 'fancy-post-grid'); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('fancy_post_grid_advanced_settings_group');
            do_settings_sections('fancy_post_grid_advanced_settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

/**
 * Register settings for Advanced Settings page
 */
function fancy_post_grid_register_advanced_settings_pro() {
    register_setting('fancy_post_grid_advanced_settings_group', 'fancy_post_grid_advanced_option');

    add_settings_section(
        'fancy_post_grid_advanced_section',
        __('Advanced Options', 'fancy-post-grid'),
        function() {
            echo '<p>' . esc_html__('Configure advanced settings for Fancy Post Grid.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_advanced_settings'
    );

    add_settings_field(
        'fancy_post_grid_advanced_option_field',
        __('Enable Feature', 'fancy-post-grid'),
        function() {
            $value = get_option('fancy_post_grid_advanced_option', '');
            echo '<input type="checkbox" name="fancy_post_grid_advanced_option" value="1" ' . checked(1, $value, false) . ' />';
        },
        'fancy_post_grid_advanced_settings',
        'fancy_post_grid_advanced_section'
    );
}
add_action('admin_init', 'fancy_post_grid_register_advanced_settings_pro');
