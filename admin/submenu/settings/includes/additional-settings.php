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

function fancy_post_grid_render_additional_settings_main() {
    // Register settings
    register_setting('fancy_post_grid_additional_settings_group', 'fpg_style_meta_icon_settings');

    // Add settings section
    add_settings_section(
        'fancy_post_grid_additional_section',
        __('Additional Options', 'fancy-post-grid'),
        function () {
            echo '<p>' . esc_html__('Configure additional settings for Fancy Post Grid.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_additional_settings'
    );

    // Define style groups
    $styles = [
        'Grid' => [
            'style1' => 'Grid Layout 1',
            'style2' => 'Grid Layout 2',
            'style3' => 'Grid Layout 3',
            'style4' => 'Grid Layout 4',
            'style5' => 'Grid Layout 5',
            'style6' => 'Grid Layout 6',
            'style7' => 'Grid Layout 7',
            'style8' => 'Grid Layout 8',
            'style9' => 'Grid Layout 9',
            'style10' => 'Grid Layout 10',
            'style11' => 'Grid Layout 11',
            'style12' => 'Grid Layout 12',
        ],
        'Slider' => [
            'sliderstyle1' => 'Slider Layout 1',
            'sliderstyle2' => 'Slider Layout 2',
            'sliderstyle3' => 'Slider Layout 3',
            'sliderstyle4' => 'Slider Layout 4',
            'sliderstyle5' => 'Slider Layout 5',
            'sliderstyle6' => 'Slider Layout 6',
            'sliderstyle7' => 'Slider Layout 7',
        ],
        'List' => [
            'liststyle1' => 'List Layout 1',
            'liststyle2' => 'List Layout 2',
            'liststyle3' => 'List Layout 3',
            'liststyle4' => 'List Layout 4',
            'liststyle5' => 'List Layout 5',
            'liststyle6' => 'List Layout 6',
            'liststyle7' => 'List Layout 7',
            'liststyle8' => 'List Layout 8',
        ],
        'Isotope' => [
            'isotopestyle1' => 'Isotope Layout 1',
            'isotopestyle2' => 'Isotope Layout 2',
            'isotopestyle3' => 'Isotope Layout 3',
            'isotopestyle4' => 'Isotope Layout 4',
            'isotopestyle5' => 'Isotope Layout 5',
            'isotopestyle6' => 'Isotope Layout 6',
            'isotopestyle7' => 'Isotope Layout 7',
            'isotopestyle8' => 'Isotope Layout 8',
        ],
    ];

    // Meta fields
    $meta_fields = [
        'author_icon' => __('Author Icon', 'fancy-post-grid'),
        'date_icon' => __('Date Icon', 'fancy-post-grid'),
        'category_icon' => __('Category Icon', 'fancy-post-grid'),
        'tags_icon' => __('Tags Icon', 'fancy-post-grid'),
        'comment_count_icon' => __('Comment Count Icon', 'fancy-post-grid'),
    ];

    // Generate settings fields grouped by categories
    foreach ($styles as $group_name => $group_styles) {
        add_settings_field(
            "fpg_meta_icon_settings_group_{$group_name}",
            sprintf(__('Disable Meta Icons for %s Styles', 'fancy-post-grid'), $group_name),
            function () use ($group_name, $group_styles, $meta_fields) {
                $options = get_option('fpg_style_meta_icon_settings', []);

                echo '<div class="fpg-style-group">';
                foreach ($group_styles as $style_key => $style_label) {
                    echo '<div class="fpg-style-item">';
                    echo '<strong>' . esc_html($style_label) . '</strong><br>';
                    $style_options = isset($options[$style_key]) ? $options[$style_key] : [];
                    foreach ($meta_fields as $field_key => $field_label) {
                        $checked = isset($style_options[$field_key]) ? $style_options[$field_key] : false;
                        echo '<label>';
                        echo '<input type="checkbox" id="fpg_disable_meta_icon_' . esc_attr($style_key . '_' . $field_key) . '" name="fpg_style_meta_icon_settings[' . esc_attr($style_key) . '][' . esc_attr($field_key) . ']" value="1"' . checked($checked, true, false) . ' />';
                        echo ' ' . esc_html($field_label) . '</label><br>';
                    }
                    echo '</div>';
                }
                echo '</div>';
            },
            'fancy_post_grid_additional_settings',
            'fancy_post_grid_additional_section'
        );
    }
}
add_action('admin_init', 'fancy_post_grid_render_additional_settings_main');

// Add CSS for grid layout
function fancy_post_grid_admin_inline_styles() {
    echo '<style>
        .fpg-style-group {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }
        .fpg-style-item {
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }
    </style>';
}
add_action('admin_head', 'fancy_post_grid_admin_inline_styles');
