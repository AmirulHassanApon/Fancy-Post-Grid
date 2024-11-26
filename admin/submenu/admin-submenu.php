<?php
/**
 * Add submenus under the main menu
 */
function fancy_post_grid_add_submenus_pro() {
    // Advanced Settings submenu
    add_submenu_page(
        'edit.php?post_type=fancy-post-grid-fpg', // Parent slug (replace with your CPT slug if needed)
        __('Advanced Settings', 'fancy-post-grid'), // Page title
        __('Advanced Settings', 'fancy-post-grid'), // Menu title
        'manage_options', // Capability
        'fancy_post_grid_advanced_settings', // Menu slug
        'fancy_post_grid_render_advanced_settings_page' // Callback function
    );

    // License Activation submenu
    add_submenu_page(
        'edit.php?post_type=fancy-post-grid-fpg', // Parent slug
        __('License Activation', 'fancy-post-grid'), // Page title
        __('License Activation', 'fancy-post-grid'), // Menu title
        'manage_options', // Capability
        'fancy_post_grid_license_activation', // Menu slug
        'fancy_post_grid_render_license_activation_page' // Callback function
    );
}
add_action('admin_menu', 'fancy_post_grid_add_submenus_pro');

require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/settings/advanced-settings.php';
require_once FANCY_POST_GRID_PATH_PRO . 'admin/submenu/ini/license-activation.php';