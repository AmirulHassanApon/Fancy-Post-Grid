<?php
function fancy_post_grid_render_additional_settings() {
    ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_additional_settings_group');
        do_settings_sections('fancy_post_grid_additional_settings');
        submit_button();
        ?>
    </form>
    <?php
}

function fancy_post_grid_render_additional_settings_main(){
    // Register settings
    register_setting('fancy_post_grid_additional_settings_group', 'fpg_disable_meta_icon_fields');

    // Add settings section
    add_settings_section(
        'fancy_post_grid_additional_section',
        __('Additional Options', 'fancy-post-grid'),
        function() {
            echo '<p>' . esc_html__('Configure additional settings for Fancy Post Grid.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_additional_settings'
    );

    // Add settings fields for disabling meta icons
    $meta_fields = [
        'author_icon' => __('Author Icon', 'fancy-post-grid'),
        'date_icon' => __('Date Icon', 'fancy-post-grid'),
        'category_icon' => __('Category Icon', 'fancy-post-grid'),
        'tags_icon' => __('Tags Icon', 'fancy-post-grid'),
        'comment_count_icon' => __('Comment Count Icon', 'fancy-post-grid'),
    ];

    foreach ($meta_fields as $field_key => $field_label) {
        add_settings_field(
            "fpg_disable_meta_icon_{$field_key}",
            sprintf(__('Disable %s', 'fancy-post-grid'), $field_label),
            function() use ($field_key) {
                $options = get_option('fpg_disable_meta_icon_fields', []);
                $checked = isset($options[$field_key]) ? $options[$field_key] : false;
                echo '<input type="checkbox" id="fpg_disable_meta_icon_' . esc_attr($field_key) . '" name="fpg_disable_meta_icon_fields[' . esc_attr($field_key) . ']" value="1"' . checked($checked, true, false) . ' />';
            },
            'fancy_post_grid_additional_settings',
            'fancy_post_grid_additional_section'
        );
    }
}
add_action('admin_init', 'fancy_post_grid_render_additional_settings_main');
