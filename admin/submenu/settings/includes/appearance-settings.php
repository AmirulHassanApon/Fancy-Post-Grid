<?php
function fancy_post_grid_render_appearance_settings() {
    ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_appearance_settings_group');
        do_settings_sections('fancy_post_grid_appearance_settings');
        submit_button();
        ?>
    </form>
    <?php
}

function fancy_post_grid_render_appearance_settings_main() {
    // Appearance Settings
    register_setting('fancy_post_grid_appearance_settings_group', 'fpg_primary_color');
    register_setting('fancy_post_grid_appearance_settings_group', 'fpg_secondary_color');
    register_setting('fancy_post_grid_appearance_settings_group', 'fpg_body_color');

    add_settings_section(
        'fancy_post_grid_appearance_section',
        __('Appearance Options', 'fancy-post-grid'),
        function() {
            echo '<p>' . esc_html__('Customize the appearance settings for Fancy Post Grid.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_appearance_settings'
    );

    add_settings_field(
        'fpg_primary_color_field',
        __('Primary Color', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_primary_color', '');
            echo '<input type="text" class="color-field" id="fpg_primary_color" name="fpg_primary_color" value="' . esc_attr($value) . '" />';
        },
        'fancy_post_grid_appearance_settings',
        'fancy_post_grid_appearance_section'
    );

    add_settings_field(
        'fpg_secondary_color_field',
        __('Secondary Color', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_secondary_color', '');
            echo '<input type="text" class="color-field" id="fpg_secondary_color" name="fpg_secondary_color" value="' . esc_attr($value) . '" />';
        },
        'fancy_post_grid_appearance_settings',
        'fancy_post_grid_appearance_section'
    );

    add_settings_field(
        'fpg_body_color_field',
        __('Body Text Color', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_body_color', '');
            echo '<input type="text" class="color-field" id="fpg_body_color" name="fpg_body_color" value="' . esc_attr($value) . '" />';
        },
        'fancy_post_grid_appearance_settings',
        'fancy_post_grid_appearance_section'
    );
}
add_action('admin_init', 'fancy_post_grid_render_appearance_settings_main');