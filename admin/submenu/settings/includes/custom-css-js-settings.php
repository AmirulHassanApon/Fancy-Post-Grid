<?php
function fancy_post_grid_render_custom_css_js_settings() {
    ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_custom_css_js_settings_group');
        do_settings_sections('fancy_post_grid_custom_css_js_settings');
        submit_button();
        ?>
    </form>
    <?php
}
function fancy_post_grid_render_custom_css_js_settings_main(){
    // Custom CSS/JS
    register_setting('fancy_post_grid_custom_css_js_settings_group', 'fpg_custom_css');
    register_setting('fancy_post_grid_custom_css_js_settings_group', 'fpg_custom_js');
    add_settings_section(
        'fancy_post_grid_custom_css_js_section',
        __('Custom CSS/JavaScript', 'fancy-post-grid'),
        function() {
            echo '<p>' . esc_html__('Add custom CSS and JavaScript.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_custom_css_js_settings'
    );

    add_settings_field(
        'fpg_custom_css_field',
        __('Custom CSS', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_custom_css', '');
            echo '<textarea id="fpg_custom_css" name="fpg_custom_css" rows="5" cols="50">' . esc_textarea($value) . '</textarea>';
        },
        'fancy_post_grid_custom_css_js_settings',
        'fancy_post_grid_custom_css_js_section'
    );

    add_settings_field(
        'fpg_custom_js_field',
        __('Custom JavaScript', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_custom_js', '');
            echo '<textarea id="fpg_custom_js" name="fpg_custom_js" rows="5" cols="50">' . esc_textarea($value) . '</textarea>';
        },
        'fancy_post_grid_custom_css_js_settings',
        'fancy_post_grid_custom_css_js_section'
    );
}
add_action('admin_init', 'fancy_post_grid_render_custom_css_js_settings_main');