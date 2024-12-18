<?php
/**
 * Render the Advanced Settings page with tabs
 */
// Include tab-specific files

require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/appearance-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/additional-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/social-share-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/includes/custom-css-js-settings.php';

function fancy_post_grid_render_advanced_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Settings', 'fancy-post-grid'); ?></h1>
        
        <!-- Tabs navigation -->
        <h2 class="fancy-grid-nav-tab-wrapper">
            <a href="#fancy-grid-appearance-settings" class="fancy-grid-nav-tab fancy-grid-nav-tab-active"><?php esc_html_e('Appearance Settings', 'fancy-post-grid'); ?></a>
            <a href="#fancy-grid-additional-settings" class="fancy-grid-nav-tab"><?php esc_html_e('Additional Settings', 'fancy-post-grid'); ?></a>
            <a href="#fancy-grid-social-share-settings" class="fancy-grid-nav-tab"><?php esc_html_e('Social Share', 'fancy-post-grid'); ?></a>
            <a href="#fancy-grid-custom-css-js-settings" class="fancy-grid-nav-tab"><?php esc_html_e('Custom CSS/JavaScript', 'fancy-post-grid'); ?></a>
        </h2>

        <!-- Tab contents -->
        <div id="fancy-grid-appearance-settings" class="fancy-grid-tab-content fancy-grid-active">
            <?php fancy_post_grid_render_appearance_settings(); ?>
        </div>

        <div id="fancy-grid-additional-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_additional_settings(); ?>
        </div>

        <div id="fancy-grid-social-share-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_social_share_settings(); ?>
        </div>

        <div id="fancy-grid-custom-css-js-settings" class="fancy-grid-tab-content">
            <?php fancy_post_grid_render_custom_css_js_settings(); ?>
        </div>
    </div>
    <?php
}
