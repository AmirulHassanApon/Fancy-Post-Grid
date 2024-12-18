<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

/**
 * Render Social Share Settings
 */
function fancy_post_grid_render_social_share_settings() {
    ?>
    <!-- Form for enabling/disabling social share -->
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_social_share_settings_group_enable');
        do_settings_sections('fancy_post_grid_social_share_settings_enable');
        submit_button(__('Save Enable/Disable Settings', 'fancy-post-grid'));
        ?>
    </form>

    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_social_share_settings_group_links');
        do_settings_sections('fancy_post_grid_social_share_settings_links');
        submit_button(__('Save Social Media Links', 'fancy-post-grid'));
        ?>
    </form>
    <?php
}

/**
 * Register and Render Social Share Settings
 */
function fancy_post_grid_render_social_share_settings_main() {
    // Register the setting for social media links
    register_setting(
        'fancy_post_grid_social_share_settings_group_links',
        'fpg_social_media_links',
        ['sanitize_callback' => 'fancy_post_grid_sanitize_social_links']
    );
    // Register settings for enable/disable
    register_setting(
        'fancy_post_grid_social_share_settings_group_enable',
        'fpg_enable_social_share',
        [
            'sanitize_callback' => function($value) {
                return $value === 'yes' ? 'yes' : 'no';
            }
        ]
    );

    add_settings_section(
        'fancy_post_grid_social_share_section_links',
        __('Social Media Links', 'fancy-post-grid'),
        function () {
            echo '<p>' . esc_html__('Add social media links for sharing posts.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_social_share_settings_links'
    );
    // Add section for enable/disable
    add_settings_section(
        'fancy_post_grid_social_share_section_enable',
        __('Social Share Options', 'fancy-post-grid'),
        function () {
            echo '<p>' . esc_html__('Enable or disable social sharing for posts.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_social_share_settings_enable'
    );
    // social icon repeater
    add_settings_field(
        'fpg_social_media_links',
        __('Social Media Links', 'fancy-post-grid'),
        'fancy_post_grid_render_social_links_repeater',
        'fancy_post_grid_social_share_settings_links',
        'fancy_post_grid_social_share_section_links'
    );
    // Enable Social Share    
    add_settings_field(
        'fpg_social_share_enable',
        __('Enable Social Share', 'fancy-post-grid'),
        function () {
            $value = get_option('fpg_enable_social_share', 'no');
            echo '<input type="checkbox" id="fpg_enable_social_share" name="fpg_enable_social_share" value="yes" ' . checked('yes', $value, false) . ' />'; 
        },
        'fancy_post_grid_social_share_settings_enable',
        'fancy_post_grid_social_share_section_enable'
    );
}

add_action('admin_init', 'fancy_post_grid_render_social_share_settings_main');

/**
 * Render Social Links Repeater
 */
function fancy_post_grid_render_social_links_repeater() {
    $links = get_option('fpg_social_media_links', []);
    ?>
    <div id="fancy-post-social-links-repeater">
        <?php
        if (!empty($links) && is_array($links)) {
            foreach ($links as $index => $link) {
                fancy_post_grid_render_social_link_row($index, $link['platform'] ?? '', $link['url'] ?? '');
            }
        } else {
            fancy_post_grid_render_social_link_row(0);
        }
        ?>
    </div>
    <button type="button" id="fancy-post-add-social-link" class="button"><?php esc_html_e('Add Social Media Link', 'fancy-post-grid'); ?></button>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const container = document.getElementById('fancy-post-social-links-repeater');
            const addButton = document.getElementById('fancy-post-add-social-link');
            let index = container.children.length;

            addButton.addEventListener('click', function () {
                const row = document.createElement('div');
                row.innerHTML = `
                    <select name="fpg_social_media_links[${index}][platform]" class="fancy-post-social-platform">
                        <option value="facebook" class="fab fa-facebook">Facebook</option>
                        <option value="twitter" class="fab fa-twitter">Twitter</option>
                        <option value="linkedin" class="fab fa-linkedin">LinkedIn</option>
                        <option value="instagram" class="fab fa-instagram">Instagram</option>
                        <option value="pinterest" class="fab fa-pinterest">Pinterest</option>
                        <option value="youtube" class="fab fa-youtube">YouTube</option>
                    </select>
                    <input type="url" name="fpg_social_media_links[${index}][url]" class="fancy-post-social-url" placeholder="<?php esc_attr_e('Enter URL', 'fancy-post-grid'); ?>" />
                    <button type="button" class="fancy-post-remove-social-link button"><?php esc_html_e('Remove', 'fancy-post-grid'); ?></button>
                `;
                row.classList.add('fancy-post-social-link-row');
                container.appendChild(row);
                index++;
                initialize_select2(); // Reinitialize select2 for the newly added row
            });

            container.addEventListener('click', function (e) {
                if (e.target.classList.contains('fancy-post-remove-social-link')) {
                    e.target.parentElement.remove();
                }
            });

            // Reinitialize select2 after the page is loaded and after each click
            function initialize_select2() {
                jQuery('.fancy-post-social-platform').select2({
                    templateResult: function (state) {
                        if (!state.id) { return state.text; }
                        var iconClass = 'fab fa-' + state.id; // Add 'fab' for Font Awesome icons
                        return jQuery('<span><i class="' + iconClass + '"></i> ' + state.text + '</span>');
                    },
                    templateSelection: function (state) {
                        if (!state.id) { return state.text; }
                        var iconClass = 'fab fa-' + state.id; // Add 'fab' for Font Awesome icons
                        return jQuery('<span><i class="' + iconClass + '"></i> ' + state.text + '</span>');
                    }
                });
            }

            initialize_select2(); // Initialize on page load for existing selects
        });
    </script>

    <style>
        #fancy-post-social-links-repeater {
            margin-bottom: 20px;
        }

        .fancy-post-social-link-row {
            display: flex;
            gap: 15px;
            margin-bottom: 12px;
            align-items: center;
            border: 1px solid #e0e0e0;
            padding: 12px;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .fancy-post-social-platform {
            flex: 2;
            padding: 10px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        .fancy-post-social-url {
            flex: 3;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .fancy-post-remove-social-link {
            background-color: #ff4757;
            color: white;
            padding: 6px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .fancy-post-remove-social-link:hover {
            background-color: #ff6b81;
        }

        #fancy-post-add-social-link {
            margin-top: 10px;
            background-color: #1e90ff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }

        #fancy-post-add-social-link:hover {
            background-color: #007acc;
        }

        .fancy-post-social-platform .select2-selection__rendered {
            display: flex;
            align-items: center;
        }

        .fancy-post-social-platform .select2-selection__rendered span i {
            margin-right: 8px;
        }
    </style>
<?php
}

/**
 * Render a single row of the social media link
 */
function fancy_post_grid_render_social_link_row($index, $platform = '', $url = '') {
    ?>
    <div class="fancy-post-social-link-row">
        <select name="fpg_social_media_links[<?php echo $index; ?>][platform]" class="fancy-post-social-platform">
            <option value=""><?php esc_html_e('Select Platform', 'fancy-post-grid'); ?></option>
            <option value="facebook" <?php selected($platform, 'facebook'); ?> class="fab fa-facebook">Facebook</option>
            <option value="twitter" <?php selected($platform, 'twitter'); ?> class="fab fa-twitter">Twitter</option>
            <option value="linkedin" <?php selected($platform, 'linkedin'); ?> class="fab fa-linkedin">LinkedIn</option>
            <option value="instagram" <?php selected($platform, 'instagram'); ?> class="fab fa-instagram">Instagram</option>
            <option value="pinterest" <?php selected($platform, 'pinterest'); ?> class="fab fa-pinterest">Pinterest</option>
            <option value="youtube" <?php selected($platform, 'youtube'); ?> class="fab fa-youtube">YouTube</option>
        </select>
        <input type="url" name="fpg_social_media_links[<?php echo $index; ?>][url]" class="fancy-post-social-url" placeholder="<?php esc_attr_e('Enter URL', 'fancy-post-grid'); ?>" value="<?php echo esc_attr($url); ?>" />
        <button type="button" class="fancy-post-remove-social-link button"><?php esc_html_e('Remove', 'fancy-post-grid'); ?></button>
    </div>
    <?php
}

/**
 * Sanitize social media links
 */
function fancy_post_grid_sanitize_social_links($input) {
    $sanitized = [];
    if (is_array($input)) {
        foreach ($input as $item) {
            $platform = sanitize_text_field($item['platform'] ?? '');
            $url = esc_url_raw($item['url'] ?? '');
            if (!empty($platform) && !empty($url)) {
                $sanitized[] = ['platform' => $platform, 'url' => $url];
            }
        }
    }
    return $sanitized;
}
