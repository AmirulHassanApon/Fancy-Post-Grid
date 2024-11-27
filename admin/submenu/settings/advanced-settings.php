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
        <h1><?php esc_html_e('Advanced Settings', 'fancy-post-grid'); ?></h1>
        
        <!-- Tabs navigation -->
        <h2 class="nav-tab-wrapper">
            <a href="#appearance-settings" class="nav-tab nav-tab-active"><?php esc_html_e('Appearance Settings', 'fancy-post-grid'); ?></a>
            <a href="#additional-settings" class="nav-tab"><?php esc_html_e('Additional Settings', 'fancy-post-grid'); ?></a>
            <a href="#social-share-settings" class="nav-tab"><?php esc_html_e('Social Share', 'fancy-post-grid'); ?></a>
            <a href="#custom-css-js-settings" class="nav-tab"><?php esc_html_e('Custom CSS/JavaScript', 'fancy-post-grid'); ?></a>
        </h2>

        <!-- Tab contents -->
        <div id="appearance-settings" class="tab-content active">
            <?php fancy_post_grid_render_appearance_settings(); ?>
        </div>

        <div id="additional-settings" class="tab-content">
            <?php fancy_post_grid_render_additional_settings(); ?>
        </div>

        <div id="social-share-settings" class="tab-content">
            <?php fancy_post_grid_render_social_share_settings(); ?>
        </div>

        <div id="custom-css-js-settings" class="tab-content">
            <?php fancy_post_grid_render_custom_css_js_settings(); ?>
        </div>
    </div>

    <style>
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>

    <script>
    jQuery(document).ready(function($) {
        var activeTab = localStorage.getItem('fancy_post_grid_active_tab') || '#appearance-settings';
        $('.nav-tab').removeClass('nav-tab-active');
        $('.tab-content').removeClass('active');
        $(`.nav-tab[href="${activeTab}"]`).addClass('nav-tab-active');
        $(activeTab).addClass('active');
        $('.nav-tab').click(function(e) {
            e.preventDefault();
            $('.nav-tab').removeClass('nav-tab-active');
            $('.tab-content').removeClass('active');
            $(this).addClass('nav-tab-active');
            $($(this).attr('href')).addClass('active');
            localStorage.setItem('fancy_post_grid_active_tab', $(this).attr('href'));
        });
    });
    </script>
    <?php
}


