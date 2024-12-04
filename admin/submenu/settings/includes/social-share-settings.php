<?php
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

    <!-- Form for managing social media links -->
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_social_share_settings_group_links');
        do_settings_sections('fancy_post_grid_social_share_settings_links');
        submit_button(__('Save Social Media Links', 'fancy-post-grid'));
        ?>
    </form>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        let socialMediaIndex = document.querySelectorAll('#fpg_social_media_repeater .social-media-row').length;
        const addButton = document.querySelector('#add-social-media');
        const container = document.querySelector('#fpg_social_media_repeater');
        const template = document.querySelector('.social-media-template');

        // Add new social media row when Add button is clicked
        addButton.addEventListener('click', function (e) {
            e.preventDefault();

            const clone = template.cloneNode(true);
            clone.classList.remove('social-media-template');
            clone.style.display = 'flex';

            // Update name attributes with unique indexes
            clone.querySelectorAll('input, select').forEach(input => {
                input.name = input.name.replace('[]', `[${socialMediaIndex}]`);
            });

            socialMediaIndex++; // Increment index for next addition
            container.appendChild(clone);
        });

        // Prevent the "Remove" action from being triggered on page load or form submission
        let isSubmitting = false;

        // Prevent automatic deletion by tracking form submissions
        container.addEventListener('click', function (e) {
            if (e.target && e.target.classList.contains('remove-social-media') && !isSubmitting) {
                e.preventDefault();
                e.target.closest('.social-media-row').remove();
            }
        });

        // Handle icon preview change based on selected platform
        container.addEventListener('change', function (e) {
            if (e.target && e.target.classList.contains('social-media-select')) {
                const iconPreview = e.target.closest('.social-media-row').querySelector('.icon-preview');
                const selectedValue = e.target.value;
                iconPreview.innerHTML = selectedValue
                    ? `<i class="dashicons dashicons-${selectedValue}"></i>`
                    : '';
            }
        });

        // Handle form submission logic
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function () {
                isSubmitting = true; // Set flag to prevent removal on form submit
            });
        }

        // Reset the submission flag after page reload
        window.addEventListener('load', function () {
            isSubmitting = false;
        });
    });
</script>


    <style>
        .social-media-row {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .social-media-row input[type="text"] {
            flex: 1;
        }
        .remove-social-media {
            color: red;
            cursor: pointer;
        }
        .icon-preview i {
            font-size: 18px;
        }
    </style>
    <?php
}

function fancy_post_grid_render_social_share_settings_main() {
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

    // Register settings for social media links
    register_setting(
        'fancy_post_grid_social_share_settings_group_links',
        'fpg_social_media_links',
        [
            'sanitize_callback' => function ($value) {
                $sanitized = [];
                if (is_array($value)) {
                    foreach ($value as $item) {
                        if (!empty($item['platform']) && !empty($item['url'])) {
                            $sanitized[] = [
                                'platform' => sanitize_text_field($item['platform']),
                                'url' => esc_url_raw($item['url']),
                            ];
                        }
                    }
                }
                return $sanitized;
            }
        ]
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

    // Add section for social media links
    add_settings_section(
        'fancy_post_grid_social_share_section_links',
        __('Social Media Links', 'fancy-post-grid'),
        function () {
            echo '<p>' . esc_html__('Manage social media links for sharing.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_social_share_settings_links'
    );

    add_settings_field(
        'fpg_social_media_links',
        __('Social Media Links', 'fancy-post-grid'),
        function () {
            $links = get_option('fpg_social_media_links', []);
            ?>
            <div id="fpg_social_media_repeater">
                <?php
                if (!empty($links)) {
                    foreach ($links as $index => $link) {
                        $platform = isset($link['platform']) ? $link['platform'] : '';
                        $url = isset($link['url']) ? $link['url'] : '';
                        ?>
                        <div class="social-media-row">
                            <select class="social-media-select" name="fpg_social_media_links[<?php echo esc_attr($index); ?>][platform]">
                                <option value="">Select</option>
                                <option value="facebook" <?php selected('facebook', $platform); ?>>Facebook</option>
                                <option value="twitter" <?php selected('twitter', $platform); ?>>Twitter</option>
                                <option value="linkedin" <?php selected('linkedin', $platform); ?>>LinkedIn</option>
                            </select>
                            <span class="icon-preview"><i class="dashicons dashicons-<?php echo esc_attr($platform); ?>"></i></span>
                            <input type="text" name="fpg_social_media_links[<?php echo esc_attr($index); ?>][url]" value="<?php echo esc_attr($url); ?>" placeholder="Enter social media URL" />
                            <span class="remove-social-media">Remove</span>
                        </div>
                        <?php
                    }
                }
                ?>
                <div class="social-media-row social-media-template" style="display: none;">
                    <select class="social-media-select" name="fpg_social_media_links[<?php echo esc_attr($index); ?>][platform]">
                        <option value="">Select</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="linkedin">LinkedIn</option>
                    </select>
                    <span class="icon-preview"></span>
                    <input type="text" name="fpg_social_media_links[<?php echo esc_attr($index); ?>][url]" placeholder="Enter social media URL" />
                    <span class="remove-social-media">Remove</span>
                </div>
            </div>
            <button id="add-social-media" class="button">Add Social Media</button>
            <?php
        },
        'fancy_post_grid_social_share_settings_links',
        'fancy_post_grid_social_share_section_links'
    );
}

add_action('admin_init', 'fancy_post_grid_render_social_share_settings_main');
?>
