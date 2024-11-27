<?php
function fancy_post_grid_render_social_share_settings() {
    ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('fancy_post_grid_social_share_settings_group');
        do_settings_sections('fancy_post_grid_social_share_settings');
        submit_button();
        ?>
    </form>
    <?php
}
function fancy_post_grid_render_social_share_settings_main() {
    // Social Share
    register_setting('fancy_post_grid_social_share_settings_group', 'fpg_enable_social_share');
    add_settings_section(
        'fancy_post_grid_social_share_section',
        __('Social Share Options', 'fancy-post-grid'),
        function() {
            echo '<p>' . esc_html__('Enable or disable social sharing for posts.', 'fancy-post-grid') . '</p>';
        },
        'fancy_post_grid_social_share_settings'
    );

    add_settings_field(
        'fpg_social_share_enable',
        __('Enable Social Share', 'fancy-post-grid'),
        function() {
            $value = get_option('fpg_enable_social_share', 'no');
            echo '<input type="checkbox" id="fpg_enable_social_share" name="fpg_enable_social_share" value="yes" ' . checked('yes', $value, false) . ' />';
        },
        'fancy_post_grid_social_share_settings',
        'fancy_post_grid_social_share_section'
    );
}
add_action('admin_init', 'fancy_post_grid_render_social_share_settings_main');
